import article from './js/menu.json'
import articleTemplate from './templates/article.hbs'
import './styles.css';

const refs = {
    themeToggle: document.querySelector('input.js-switch-input'),
    jsMenu: document.querySelector('.js-menu')
}

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};


if(localStorage.getItem('theme') === 'light'){
    document.querySelector('body').classList.remove(Theme.DARK) ;
}else{
    document.querySelector('body').classList.add(Theme.DARK);
    refs.themeToggle.setAttribute('checked', 'true')
}

function markUpStr(arr){
    return arr.reduce((resStr, strItem) => {
        resStr += articleTemplate(strItem);
        
        return resStr;
    }, '');
};

const markUpInsert = markUpStr(article);

refs.jsMenu.innerHTML = markUpInsert;
refs.themeToggle.addEventListener('change', HandleThemeSwitch);

function HandleThemeSwitch(e){
    document.querySelector('body').classList.toggle(Theme.DARK);
        if(localStorage.getItem('theme') === 'light'){
            localStorage.setItem('theme', 'dark');
        }else{
            localStorage.setItem('theme', 'light');
        }   
    }