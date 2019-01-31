import DBHandler from '../../lowDB/lowDB';

/**
 * studyStart confirm-alert Option
 *
 * @param {string} msgName
 * @param {function} action
 */
const startConfirm = (currentDay, msgName, action) => {
  const resultMsg = `${msgName}하시겠습니까?`;

  return {
    title: 'Confirm',
    message: resultMsg,
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          //DB 콜렉션 존재여부 체크
          const checker = DBHandler.collectionCheck(currentDay);
          if (!checker) {
            DBHandler.setCollection(currentDay);
          }
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
 * SaveStudiedTime.
 *
 * @param {string} currentDay
 * @param {string} startTime
 * @param {string} endTime
 * @param {function} resetAction
 */
const saveStudiedTime = (currentDay, startTime, endTime, resetAction) => {
  return {
    title: 'Confirm',
    message: '저장하시겠습니까? 저장하신 후에는 수정 및 삭제가 불가능합니다.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          DBHandler.insertStudyTime(currentDay, startTime, endTime);
          resetAction();
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

export { startConfirm, stopConfirm, saveStudiedTime, studyReset };
