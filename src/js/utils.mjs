
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(templateFn);
  if (clear){
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback){
    callback(data);
  }
  
}

async function loadTemplate(path){
  const htmlContents = await fetch(path);
  const template =  await htmlContents.text();
  return template;
}

export async function loadHeaderFooter(){
  const header = await loadTemplate("/partials/header.html");
  const headerElement = document.querySelector("#home-header");
  const footer = await loadTemplate("/partials/footer.html");
  const footerElement = document.querySelector("#home-footer");
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == "SPAN") { 
        main.removeChild(this);
      }
  })

  const main = document.querySelector('main');
  main.prepend(alert);

  if(scroll)
    window.scrollTo(0,0);
}