import React, { useRef, useEffect, useState, useContext } from 'react';
import { isAdmin } from '../helpers/isAdmin';
import styles from './App.module.css';
import controlBtnsOnOfContext from '../helpers/context';
import { ModalForInput } from '../NewElementForSelect/ModalForInput';
import ReactDOM from 'react-dom';
import { addElement } from '../helpers/infoelemens/addElement';
import { CreateWrapper } from '../adminkaInterface/CreateWrapper';
import { myFunc } from '../adminkaInterface/myFunc';

//   const testObserver = document.querySelector(
//     '[tour-attribute="homePage"] ul li a',
//   );
//   console.log(testObserver);
//   // observer.observe(testObserver);

function App({ title, children, className = null, tag = 'div' }) {
  const ctx = useContext(controlBtnsOnOfContext);

  const backdropRef = useRef(null);
  const [description, setDescription] = useState('');

  const [state, setstate] = useState(null);
  const [targetEl, setTargetEl] = useState(null);
  const addDescription = async text => {
    setDescription(text);
    addElement(ctx.path, text, ctx.setElements);
  };

  useEffect(() => {
    console.log(ctx.elements);
    if (!ctx.elements[0]) return;
    const callback = entries => {
      const steps = [];
      entries.forEach(entry => {
        console.log('entry', entry.target);
        if (entry.isIntersecting) {
          // console.log('entry', [entry.target]);
          const usageEntry = ctx.elements.filter(({ path }) => {
            console.log(entry.target === document.querySelector(path));
            return entry.target === document.querySelector(path);
          });
          // console.log(usageEntry);
          //     target: '[tour-attribute="formForAddContacts"] form input[name="name"]',
          //     content: 'Write the name of the subscriber',
          steps.push({
            target: usageEntry[0].path,
            content: usageEntry[0].description,
            id: usageEntry[0]['_id'],
          });
        }
      });
      if (steps[0]) {
        ctx.dispatchTourState({ type: 'RESTART', steps: steps });
      }
    };

    const options = {
      //   root: document.querySelector('.scroll-list'),
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    const elementsObserve = ctx.elements.forEach(el => {
      const element = document.querySelector(el.path);
      const isShownElements = ctx.shownElements?.includes(el['_id']) ?? false;
      console.log(isShownElements);
      if (element && !isShownElements) {
        console.log(element);
        observer.observe(element);
      }
    });
    // console.log(elementsObserve);
    // const testObservers = document.querySelectorAll(elementsObserve);
    // console.log(testObservers);
    // observer.observe(elementsObserve);
  }, [ctx.elements]);

  return React.createElement(
    `${tag}`,
    {
      className: className,
      'tour-attribute': title,
      ref: backdropRef,
    },
    [
      children,
      ctx.isModalDescription && (
        <ModalForInput
          addDescription={addDescription}
          closeModal={ctx.setIsModalDescription}
        />
      ),
    ],
  );
}

export default App;
