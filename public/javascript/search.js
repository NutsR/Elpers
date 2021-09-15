const searchResults =  function(e){
fetch('http://localhost:3000/elpers/search' ,{
 method: 'POST',
headers: {
'Content-Type': 'application/json; charset=utf-8',
},
 body: JSON.stringify({result: e.value})
}).then(res => res.json()).then(data => console.log(data))
}

fetch('/elpers/review/id', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({review: e.value})
}


