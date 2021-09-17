const priceLow = document.querySelector('#price-low');

priceLow.addEventListener('click', function(){
 fetch('/elpers/sortElpers', {
             method: 'POST',
	     headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({sort: 'price'})
         }).then(response =>  response.json())
	   .then(data => {
	 const sectionElp =  document.querySelector('.section-elp')
	      sectionElp.innerHTML = '';
		data.docs.forEach(elp => {
	const div = document.createElement('div');
    const newElper = `<div class="card mb-3 text-light bg-dark">
            <div class="row">
                <div class="col-md-4">
                    <img src="${ elp.images[0].url }" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${elp.title}</h5>
                        <p class="card-text">${elp.description}</p>
                        <p class="card-text">
                            <small class="text-muted">${elp.location}</small>
                        </p>
                        <p class="card-text text-muted">${elp.price} ₹/day</p>
                        <a href="/elpers/${ elp._id }" class="btn btn-primary">View More</a>
                    </div>
                </div>
            </div>
        </div>`;
  div.innerHTML = newElper;
  sectionElp.append(div);
		})
currentPage = data.page;
	})
document.querySelector('.infScroll').innerHTML = '<button id="sort" class="btn btn-secondary">Load more Filtered</button>'


const pageSort = document.getElementById('sort')
pageSort.addEventListener('click' , async() => {
    currentPage  += 1;
    const response = await fetch('/elpers/sortElpers', { 
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify({page: currentPage, sort: 'price'})
   })
 const data = await response.json()
console.log(data)
if(data.hasNextPage){
 data.docs.forEach(elp => {
    const div = document.createElement('div');
    const newElper = `<div class="card mb-3 text-light bg-dark">
            <div class="row">
                <div class="col-md-4">
                    <img src="${ elp.images[0].url }" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${elp.title}</h5>
                        <p class="card-text">${elp.description}</p>
                        <p class="card-text">
                            <small class="text-muted">${elp.location}</small>
                        </p>
                        <p class="card-text text-muted">${elp.price} ₹/day</p>
                        <a href="/elpers/${ elp._id }" class="btn btn-primary">View More</a>
                    </div>
                </div>
            </div>
        </div>`;
  div.innerHTML = newElper;
document.querySelector('.section-elp').append(div)
	})
} else {
const endLine = document.createElement('h6').innerText = 'no more camps';
document.querySelector('.section-elp').append(endLine)
pageSort.remove()
}
})
})
