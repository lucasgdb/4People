const btns = document.querySelectorAll('.btn'),
  btnTop = document.querySelectorAll('.btnTop');

for (let i = 0; i < btns.length; i++)
  btns[i].onclick = () => {
    const smenu = btns[i].parentElement.querySelector('.smenu');
    if (smenu !== null) {
      if (smenu.style.maxHeight === '100em')
        smenu.style.maxHeight = '0em'
      else smenu.style.maxHeight = '100em'
    }
  }

for (let i = 0; i < btnTop.length; i++)
  btnTop[i].onclick = () => {
    const menu = btnTop[i].parentElement.querySelector('.menu');
    if (menu !== null) {
      if (menu.style.maxHeight === '0em')
        menu.style.maxHeight = '100em'
      else menu.style.maxHeight = '0em'
    }
  }