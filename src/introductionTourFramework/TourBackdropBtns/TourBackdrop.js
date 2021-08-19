import React, { useState, useRef, useEffect, useReducer } from 'react';

import { TourBtns } from '../TourBtns/TourBtns';
import controlBtnsOnOfContext from '../helpers/context';
// import { isAdmin } from '../helpers/isAdmin';
import ApiService from '../helpers/work-with-bakend';
import ModalMain from '../ModalMain/ModalMain';
import '../Interface/Interface';
import { NewDom } from '../NewDom/NewDom';
import Tour from '../Tour/Tour';

const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: null,
};

function reducer(state, action) {
  // console.log('state', state);
  switch (action.type) {
    case 'on':
      return true;
    case 'off':
      return false;
    default:
      throw new Error();
  }
}

const reducerStepsTour = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NEW':
      return {};
    case 'START':
      return { ...state, run: true };
    case 'RESET':
      return { ...state, stepIndex: 0 };
    case 'STOP':
      return { ...state, run: false };
    case 'NEXT_OR_PREV':
      return { ...state, ...action.payload };
    case 'RESTART':
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
        steps: [...action.steps],
      };
    default:
      return state;
  }
};

export function TourBackdrop({ className = null, children, config }) {
  const apiService = new ApiService(config);
  const [isStartAddElements, setIsStartAddElements] = useState(false);
  const [elements, setElements] = useState([]);
  const [isAdminM, dispatchModal] = useReducer(reducer, false);
  const [isAdminB, dispatchButton] = useReducer(reducer, false);
  const [myTestNewDom, setMyTestNewDom] = useState(true);
  const [isModalDescription, setIsModalDescription] = useState(false);
  const [path, setPath] = useState('');
  const backdropRef = useRef(null);
  const [tourState, dispatchTourState] = useReducer(
    reducerStepsTour,
    INITIAL_STATE,
  );
  const [shownElements, seShownElements] = useState(
    JSON.parse(localStorage.getItem('shownElements')),
  );

  // console.log(isAdminM);

  useEffect(() => {
    runOnKeys(dispatchModal, 'KeyL', 'KeyS', 'KeyD');
    // if (keyListener.current) {
    //   console.log('s');
    //   window.addEventListener('keypress', onKeyPressClick);
    // }
    // keyListener.current = false;
    apiService.getElements().then(r => {
      setElements(s => [...s, ...r.data]);
      return r.data;
    });

    console.log('fetch');
  }, []);
  return (
    <controlBtnsOnOfContext.Provider
      value={{
        isStartAddElements,
        apiService: apiService,
        elements,
        setElements,
        dispatchModal,
        dispatchButton,
        reducer,
        path,
        setPath,
        isModalDescription,
        setIsModalDescription,
        shownElements,
        seShownElements,
        tourState,
        dispatchTourState,
      }}
    >
      <div className={className} ref={backdropRef}>
        {children}
        {!isAdminM && !isAdminB && tourState.steps && <Tour />}
        {isAdminB && (
          <TourBtns changeIsStartAddElements={setIsStartAddElements} />
        )}
      </div>

      {isAdminM && (
        <ModalMain
          dispatchModal={dispatchModal}
          dispatchButton={dispatchButton}
        />
      )}
      {backdropRef.current && isAdminB && isStartAddElements && (
        <NewDom reference={backdropRef.current} />
      )}
    </controlBtnsOnOfContext.Provider>
  );
}

function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function (event) {
    pressed.add(event.code);

    for (let code of codes) {
      // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    // dispatchModal();
    func({ type: 'on' });
  });

  document.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
  });
}
