export function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        resolve(text);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
}

export function readFileAsBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
}
  