export function getRandomdIds(num_ids, max_val) {
    // Returns a list of random ids between 1 and max_val with  length num_ids
    const ids = []
    while (ids.length < num_ids) {
        const val = Math.floor(Math.random() * max_val + 1)
        if (ids.filter((v) => v === val).length === 0)
            ids.push(val);
    }
    return ids;
}

export function between(min, max) {  
    // Returns an integer between min (inclusive) and max (exclusive)
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

export const getImage = (url) => new Promise((res, rej) => {
  const img = new Image();
  img.addEventListener(
      'load', 
      () => res(img)
  );
  img.addEventListener(
      'error', 
      (err) => rej(err)
  );
  img.src = url;
});