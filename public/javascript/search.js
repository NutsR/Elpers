const searchResults =  function(e){
fetch('/elpers/search' ,{
mode: 'no-cors',
 method: 'POST',
 headers: {'Content-Type': 'application/json'},
 body: JSON.stringify(e.value)
}).then(res => {
  res.json()
}).then(data => {
 console.log(data) 
}).catch(err => {
console.error(err)
})
}
