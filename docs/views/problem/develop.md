<!--
 * @Descripttion: 
 * @Author: hanb
 * @Date: 2022-04-08 16:51:59
 * @LastEditors: hanb
 * @LastEditTime: 2022-04-12 14:06:16
-->
# 怎么实现大文件快速上传
https://mp.weixin.qq.com/s/AsG1uCyJkaIpnFcHbSgvBQ  

总体思路：将文件变小 压缩或者分块后上传  
前端负责分块，服务端负责整合  
Blob.property.slice === File.property.slice  
由于前端会将资源分块，然后单独发送请求，也就是说，原来 1 个文件对应 1 个上传请求，现在可能会变成 1 个文件对应 n 个上传请求，所以前端可以基于 Promise.all 将这多个接口整合，上传完成在发送一个合并的请求，通知服务端进行合并。  
如果某个分块的上传请求失败了，怎么办？

一旦服务端某个上传请求失败，会返回当前分块失败的信息，其中会包含文件名称、文件 hash、分块大小以及分块序号等，前端拿到这些信息后可以进行重传，同时考虑此时是否需要将 Promise.all 替换为 Promise.allSettled 更方便.

* 1.接口代码  
文件上传接口要将头设置为 Content-Type: 'multipart-form-data',通知合并的就设置application/json
* 2.文件资源分块
```js
// 获取文件分块
const getFileChunk = (file, chunkSize = DefualtChunkSize) => {
  return new Promise((resovle) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of');

      const chunk = e.target.result;
      spark.append(chunk);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        let fileHash = spark.end();
        console.info('finished computed hash', fileHash);
        resovle({ fileHash });
      }
    };

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      let start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
      let chunk = blobSlice.call(file, start, end);
      fileChunkList.value.push({ chunk, size: chunk.size, name: currFile.value.name });
      fileReader.readAsArrayBuffer(chunk);
    }

    loadNext();
  });
}
```

* 3.发送上传请求和合并请求
```js
// 上传请求
const uploadChunks = (fileHash) => {
  const requests = fileChunkList.value.map((item, index) => {
    const formData = new FormData();
    formData.append(`${currFile.value.name}-${fileHash}-${index}`, item.chunk);
    formData.append("filename", currFile.value.name);
    formData.append("hash", `${fileHash}-${index}`);
    formData.append("fileHash", fileHash);
    return uploadFile('/upload', formData, onUploadProgress(item));
  });

  Promise.all(requests).then(() => {
    mergeChunks('/mergeChunks', { size: DefualtChunkSize, filename: currFile.value.name });
  });
}
```

* 4.后端整合分块

* 5.断点续传 
让请求可中断，记录中断位置，保存取消的请求分块列表位置信息，以便后期重新发起请求  
取消请求的几种方式

如果使用原生 XHR 可使用 (new XMLHttpRequest()).abort() 取消请求  
如果使用 axios 可使用 new CancelToken(function (cancel) {}) 取消请求  
如果使用 fetch 可使用 (new AbortController()).abort() 取消请求