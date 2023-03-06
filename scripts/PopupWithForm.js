import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));

    this._inputsNameList = this._inputsList.map((item) => item.name);



    // this._getInputValues = this._getInputValues.bind(this);
    // this.getDataFormArr = this.getDataFormArr.bind(this);
    // this.getTest = this.getTest.bind(this)
    // this._closeByMouse = this._closeByMouse.bind(this);
  }

  setInputsInitial(initialInputsValuesList) {




    // console.log(initialInputsValuesList)

    // const varList = this._inputsList.map((item) => item.name).join(', ');
    this._inputsList.forEach((item) =>     
    {
      if (item.name in initialInputsValuesList) item.value = initialInputsValuesList[item.name];
    });


    

  //  const { name, about } = initialInputsValuesList;



  //   console.log(name)

    // console.log(this._inputsNameList)

    // const greekGods = { love: 'Афродита', war: 'Арес', trade: 'Гермес' };

    // /* перечисляем свойства, которые нужно достать, в фигурных скобках */
    // const { love, war, trade } = greekGods; // имена переменных совпадают с ключами объекта



  }

  _getInputValues() {
    return this._inputsList;
  }

  getDataFromForm() {  

    // const inputsData = {};
    // this._inputsList.forEach((item) => {
    //    inputsData[item.name] = item.value
    // });
    // return [inputsData];


    // return [this._inputsList.reduce((acc, item) => {
    // const itemList = acc;
    //     itemList[item.name] = item.value;         
    //      return itemList;
    // }, {})];

    return this._inputsList.reduce( (acc, item) => { return {...acc, [item.name]: item.value,}}, {});


  }

  // getTest() {

  //  return this._inputsList.reduce((acc, item) => 

  //  {

  // const itemList = acc;
  // itemList[item.name] = item.value;         
  //  return itemList;

  // return {acc, acc[item.name] = item.value}

  // }
  // , {});

  // return test;

  // }

  setEventListeners() {
    // this._popup.addEventListener('mousedown', (evt) => {
    //   if (evt.target.classList.contains('popup_opened')) {
    //     this.close();
    //   }
    //   if (evt.target.classList.contains('popup__close-button')) {
    //     this.close();
    //   };
    // });

    this._popup.addEventListener('mousedown', this._closeByMouse)

    document.addEventListener('keydown', this._handleEscClose);

    this._form.addEventListener('submit', this._submitForm);

  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._form.reset();

  }

}

export { PopupWithForm }