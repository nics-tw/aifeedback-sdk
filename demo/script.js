document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const serviceId = prompt('請輸入 serviceId', 'test');
    const dsn = prompt(
      '請輸入 API Host',
      'https://aifeedback.nics.nat.gov.tw'
    );

    if (!serviceId || !dsn) {
      throw new Error('未提供 serviceId 或 API Host');
    }

    window.FeedbackSDK.init({
      serviceId,
      dsn: dsn + '/api',
    });
  } catch (error) {
    alert(`SDK 初始化失敗: ${error.message}`);
    console.error('SDK 初始化失敗:', error.message);
  }

  const RATING_MODES = {
    3: [
      { value: 'good', label: '滿意 👍' },
      { value: 'normal', label: '普通 😐' },
      { value: 'bad', label: '不滿意 👎' },
    ],
    5: [
      { value: 'good', label: '滿意 👍' },
      { value: 'decent', label: '還不錯 🙂' },
      { value: 'normal', label: '普通 😐' },
      { value: 'weak', label: '不太好 🙁' },
      { value: 'bad', label: '不滿意 👎' },
    ],
  };

  let selectedRating = null;
  const ratingButtonsContainer = document.getElementById('ratingButtons');

  function resetButtonStyles() {
    ratingButtonsContainer.querySelectorAll('button').forEach((btn) => {
      btn.classList.remove(`selected-${btn.dataset.rating}`);
    });
  }

  function renderRatingButtons(mode) {
    selectedRating = null;
    ratingButtonsContainer.replaceChildren();
    RATING_MODES[mode].forEach(({ value, label }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = label;
      btn.dataset.rating = value;
      btn.addEventListener('click', () => {
        selectedRating = value;
        resetButtonStyles();
        btn.classList.add(`selected-${value}`);
      });
      ratingButtonsContainer.appendChild(btn);
    });
  }

  document.querySelectorAll('input[name="ratingMode"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      renderRatingButtons(event.target.value);
    });
  });

  renderRatingButtons(document.querySelector('input[name="ratingMode"]:checked').value);

  document.getElementById('submitBtn').addEventListener('click', () => {
    if (!selectedRating) {
      alert('請先選擇一個評分');
      return;
    }
    const comment = document.getElementById('comment').value;
    const feedback = {
      feedbackRating: selectedRating,
      feedbackComment: comment,
      inferenceSec: Math.round((Math.random() * 20 + 5) * 10) / 10,
    };
    submitFeedback(feedback);
  });

  async function submitFeedback(feedbackData) {
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    submitBtn.classList.remove('success', 'error');

    try {
      const result = await window.FeedbackSDK.submit(feedbackData);
      console.log('提交成功:', result);
      submitBtn.textContent = '回饋已成功送出！';
      submitBtn.classList.add('success');

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove('success');

        selectedRating = null;
        document.getElementById('comment').value = '';
        resetButtonStyles();
      }, 2000);
    } catch (error) {
      console.error('提交失敗:', error);
      submitBtn.textContent = `提交失敗: ${error.message}`;
      submitBtn.classList.add('error');

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove('error');
      }, 3000);
    }
  }
});
