const { getStorage, ref, listAll } = require('firebase/storage')

const listPapers = async () =>{
  const storage = getStorage()
  const listRef = ref(storage, 'mern');
  const contents = await listAll(listRef)

  const result = contents.items.map(fileRef => {
    return {
      name: fileRef.name
    };
  });

  return result
} 

module.exports = { listPapers };