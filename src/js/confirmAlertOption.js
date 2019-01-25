/**
 * studyStart confirm-alert Option
 *
 * @param {string} msgName
 * @param {function} action
 */
const startConfirm = (msgName, action) => {
  const resultMsg = `${msgName}하시겠습니까?`;

  return {
    title: 'Confirm',
    message: resultMsg,
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          //if(_CURRENTDAY )
          action();
        }
      },
      {
        label: 'No',
        onClick: () => {
          return;
        }
      }
    ]
  };
};

/**
 * studyStop confirm-alert option
 *
 * @param {string} msgName
 * @param {function} action
 */
const stopConfirm = (msgName, action) => {
  const resultMsg = `${msgName}하시겠습니까? 중지할 시 학습 시간이 기록이 반영되어 수정할 수 없습니다.`;

  return {
    title: 'Confirm',
    message: resultMsg,
    buttons: [
      {
        label: 'Yes',
        onClick: action
      },
      {
        label: 'No',
        onClick: () => {
          return;
        }
      }
    ]
  };
};

/**
 * study start & end reset
 *
 * @param {function} action
 */
const studyReset = action => {
  return {
    title: 'Confirm',
    message: '초기화하시겠습니까? 초기화시 복구할 수 없습니다.',
    buttons: [
      {
        label: 'Yes',
        onClick: action
      },
      {
        label: 'No',
        onClick: () => {
          return;
        }
      }
    ]
  };
};

export { startConfirm, stopConfirm, studyReset };
