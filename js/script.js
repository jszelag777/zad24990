let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {
    let loader = document.getElementById('preloader');
    console.log('showPreloader()');
    loader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {
    let loader = document.getElementById('preloader');
    console.log('hideoader()');
    loader.style.display = 'none';
    preloading = false;
}

const getData = () => {

    if (!preloading) {

        showPreloader();

        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(response => response.json())
            .then((data) => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User name: ${user.name}`;
                    pWebsite.innerHTML = `User website: ${user.website}<br/>--------`;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
                }
                hidePreloader();
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    // console.log('getData');
}

const scrollToEndOfPage = () => {
    let doc = document.documentElement;
    let scrollHeight = doc.scrollHeight;
    let scrollTop = doc.scrollTop;
    let clientHeight = doc.clientHeight;

    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    console.log(`scrollHeight: ${scrollHeight}`);
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    // console.log('scrollToEndOfPage');

    if (sumScrollTopClientHeight >= scrollHeight) {
        endOfThePage += 1;

        console.log(`Przescrollowano do końca strony ${endOfThePage} razy`);

        getData();
    }
}

window.addEventListener('scroll', scrollToEndOfPage);