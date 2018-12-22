const btns = document.querySelectorAll('.btn'),
  btnTop = document.querySelectorAll('.btnTop'),
  menu = document.querySelector('.containerMenus'),
  nav = document.querySelector('.leftNav');

for (let i = 0; i < btns.length; i++)
  btns[i].onclick = () => {
    const smenu = btns[i].parentElement.querySelector('.smenu');
    for (let j = 0; j < btns.length; j++)
      if (btns[i] !== btns[j])
        btns[j].parentElement.querySelector('.smenu').className = 'smenu'

    if (smenu.className === 'smenu actived')
      smenu.className = 'smenu'
    else smenu.className = 'smenu actived'
  }

for (let i = 0; i < btnTop.length; i++)
  btnTop[i].onclick = () => {
    const menu = btnTop[i].parentElement.querySelector('.menu');

    if (menu.className === 'menu actived')
      menu.className = 'menu'
    else menu.className = 'menu actived'
  }

menu.onclick = () => {
  if (nav.style.display === 'block')
    nav.style.display = 'none'
  else nav.style.display = 'block'
}

