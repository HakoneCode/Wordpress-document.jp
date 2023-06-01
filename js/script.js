const textArea = document.querySelector(".text-area");
const typing1 = document.querySelector(".typing1");
const menuHtml = `
<div class="container">
  <div class="battle"><button class="btn">たたかう</button></div>
  <div class="info"><button class="btn">インフォメーション</button></div>
  <div class="profile"><button class="btn">プロフィール</button></div>
  <div class="products"><button class="btn">つくったもの</button></div>
</div>
`;

function typing(el, text) {
  var charIndex = 0;
  var typingInterval = setInterval(function () {
    if (charIndex < text.length) {
      el.innerHTML += text.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 80);
}

function startTypingAnimation(el) {
  const messages = {
    A: [
      "document.jpへようこそ!",
      "ようこそ！",
      "こんにちは！",
      "ここはdocument.jpです。",
      "document.jpにきてくれてありがとう!",
      "ようこそ! document.jpへ!",
    ],
    B: [
      "わたしとたたかうことももできるよ",
      "プロフィールもみてね",
      "WordPressでこのページは作っているよ",
      "まだまだプログラミング初心者だよ",
      "プログラミングの勉強をしているよ",
      "最近はFlutterの学習にはまっているよ!",
      "みんなにいいことがあればいいな",
      "特に意味はないけど、ドラクエをイメージしてこのページを作ったよ",
      "このページは締め切り間際で泣きながら作ったよ",
      "いつかは凄腕プログラマーになりたいな",
      "まだまだ、このサイトは未完成だよ!",
    ],
    C: [
      "このサイトはJavaScriptで作られているよ!",
      "このサイトを楽しんでもらえたら嬉しいな",
      "おすすめの書籍や動画があれば教えてくださいね☆",
      "何か不具合を発見した場合はご報告ください♪",
      "何かありましたら、twitterまで連絡くださいね☆",
      "プログラミングって楽しいですよねー☆",
      "私と一緒に勉強してくれたら嬉しいな☆",
      "サイト制作のアドバイスをくれたら嬉しいな☆",
      "新しい記事やアプリも追加したいなー",
      "何か新しい機能も追加したいなー",
    ],
  };

  const randomA = Math.floor(Math.random() * messages.A.length);
  const randomB = Math.floor(Math.random() * messages.B.length);
  const randomC = Math.floor(Math.random() * messages.C.length);

  const randomMessage = `${messages.A[randomA]}\n${messages.B[randomB]}\n${messages.C[randomC]}`;
  el.innerHTML = "";
  typing(el, randomMessage);
  el.classList.add("message");
}

function finishTypingAnimation() {
  typing1.style.display = "none";
  textArea.innerHTML = menuHtml;

  function resetMenu() {
    const fadeout = document.createElement("div");
    fadeout.classList.add("fadeout");
    textArea.insertAdjacentElement("afterend", fadeout);

    setTimeout(() => {
      window.location.href = "https://document.jp";
    }, 2000); // 2秒後にトップページにリダイレクトする
  }

  // "たたかう"ボタンのクリックイベントを割り当てる
  const battleBtn = document.querySelector(".battle button");
  battleBtn.addEventListener("click", () => {
    let playerHP = 50;
    let enemyHP = 50;

    function showBattleMenu() {
      textArea.innerHTML =
        '<div class="battle-container">' +
        '<button class="attack-btn">こうげき</button>' +
        '<button class="escape-btn">にげる</button>' +
        "</div>";

      const attackBtn = document.querySelector(".attack-btn");

      const showDamageEffect = () => {
        const effect = document.createElement("img");
        effect.src =
          document.getElementById("templateDirectoryUri").value +
          "/images/damage-effect.png";

        effect.alt = "ダメージエフェクト";
        effect.classList.add("effect");

        const effectContainer = document.createElement("div");
        effectContainer.classList.add("effect-container");
        effectContainer.appendChild(effect);

        textArea.insertAdjacentElement("afterend", effectContainer);

        effect.addEventListener("animationend", () => {
          effectContainer.remove();
        });
      };

      attackBtn.addEventListener("click", () => {
        attackBtn.style.display = "none";
        escapeBtn.style.display = "none";
        showDamageEffect();

        const damageEffect = document.createElement("div");
        damageEffect.classList.add("damage-effect");
        document.body.appendChild(damageEffect);
        setTimeout(() => {
          damageEffect.remove();
        }, 500);

        // ダメージ計算
        const damage = Math.floor(Math.random() * 11) + 10;
        enemyHP -= damage;
        const message = `あなたのこうげき！${"　　　"}${damage}ダメージ！`;
        let i = 0;
        const printMessage = setInterval(() => {
          textArea.innerHTML += message[i];
          i++;
          if (i >= message.length) {
            clearInterval(printMessage);
            if (enemyHP <= 0) {
              textArea.innerText += "\n\n敵をたおした！";
              setTimeout(() => {
                resetMenu();
              }, 2000); // 2秒後にresetMenu関数を呼び出す
              return;
            }

            setTimeout(() => {
              enemyAttack();
            }, 1000);
            attackBtn.style.display = "inline-block";
            escapeBtn.style.display = "inline-block";
            showDamageEffect();
          }
        }, 50);
      });

      function enemyAttack() {
        const enemyDamage = Math.floor(Math.random() * 11) + 10;
        playerHP -= enemyDamage;
        const message = ` \n⇒${"　　"}敵のこうげき！ ${"　　　"}${enemyDamage}ダメージ！`;
        let i = 0;
        const printMessage = setInterval(() => {
          textArea.innerText += message[i];
          i++;
          if (i >= message.length) {
            clearInterval(printMessage);
            if (playerHP <= 0) {
              textArea.innerText += "\n\nあなたはたおれました…";
              setTimeout(() => {
                resetMenu();
              }, 2000); // 2秒後にresetMenu()を呼び出す
              return;
            }
            setTimeout(() => {
              showBattleMenu();
            }, 1500); // 2秒後にshowBattleMenu()を呼び出す
          }
        }, 50);
      }

      // にげるボタン
      const escapeBtn = document.querySelector(".escape-btn");
      escapeBtn.addEventListener("click", () => {
        escapeBtn.style.display = "none";
        attackBtn.style.display = "none";
        const message = "あなたはにげだしました…";
        let i = 0;
        const printMessage = setInterval(() => {
          textArea.innerHTML += message[i];
          i++;
          if (i >= message.length) {
            clearInterval(printMessage);
            setTimeout(() => {
              resetMenu();
            }, 2000); // 2秒後にresetMenu()関数を呼び出す
          }
        }, 50);
      });
    }

    showBattleMenu();
  });

  // "プロフィール"ボタンのクリックイベントを割り当てる
  const profileBtn = document.querySelector(".profile button");
  profileBtn.addEventListener("click", () => {
    textArea.classList.add("open");
    textArea.innerHTML = `
      <p>名前：ゆう</p>
      <p>年齢：ひみつ</p>
      <p>プログラミング：HTML、CSS、JavaScript、PHP、Flutter</p>
      <p>document.jpのドメインの価格：2泊3日の旅行ができるぐらい。家族に怒られた。</p>
      <p>PC：Windows。Macがほしいです</p>
      <p>その他：コツコツ勉強しています！応援してね☆</p>
      <p>　</p>
      <button class="back-btn" onclick="location.href='https://document.jp/'">戻る</button>
      `;
  });

  // "インフォメーション"ボタンのクリックイベントを割り当てる
  const infoBtn = document.querySelector(".info button");
  infoBtn.addEventListener("click", () => {
    textArea.innerHTML = "インフォメーションを表示するね";
    setTimeout(() => {
      window.location.href = "https://document.jp/information";
    }, 2000);
  });

  // "つくったもの"ボタンのクリックイベントを割り当てる
  const productsBtn = document.querySelector(".products button");
  productsBtn.addEventListener("click", () => {
    textArea.innerHTML = "つくったものを表示するね";
    setTimeout(() => {
      window.location.href = "https://document.jp/products";
    }, 2000);
  });
}

typing1.addEventListener("animationend", () => {
  finishTypingAnimation();
});

setTimeout(() => {
  startTypingAnimation(typing1);
}, 0);
