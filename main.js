 let spotList=[];

const loadview=()=>{
  const topicText=firebase
   .database()
   .ref()
   .child('topics')
   .orderByChild('text');

   topicText.off('child_added');

   topicText.on('child_added', (topicSnapshot) => {
    const topicId = topicSnapshot.key;
    const topicData = topicSnapshot.val();
    // console.log(topicId);
    console.log(topicData.text);
    spotList.push(topicData.text);
    console.log(spotList);
  });
};

const deletetopic = (topicId) => {
  firebase
    .database()
    .ref('topics')
    .child(topicId)
    .remove();
};


const resetModal = () => {
  $('#add-topic')[0].reset();
};
// ゲストログイン
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('ログインしました');
    // getTopic();
    loadview();
  } else {
    console.log('ログインしていません');

    firebase
      .auth()
      .signInAnonymously() // 匿名ログインの実行
      .catch((error) => {
        // ログインに失敗したときの処理
        console.error('ログインエラー', error);
      });
  }
});

// topic削除機能
// const deleteTopic=(topicId)=>{
//   firebase
//     .database()
//     .ref('topics')
//     .child()
//     .remove()
//     .then(()=>{
//       console.log("削除成功")
//     })
//     .catch((error)=>{
//       console.log("エラー:",error);
//     });
// };
//
// $("#trash").on('click',(e)=>{
//   console.log("削除機能作動")
//   deleteTopic();
// });



// トピック追加処理
// $("#add-topic").on("submit",(e)=>{
//   const topic=$('#add-topic__text').val();
//
//   e.preventDefault();
//
//
//   if (topic === '') {
//     return;
//   }
//   firebase
//     .database()
//     .ref('topics')
//     .push(topic)
//     .then(()=>{
//       $("#exampleModal").modal('hide');
//       resetModal();
//       console.log(topic);
//       spotList.push(topic);
//       console.log(spotList);
//     });
//
//
// });
$("#add-topic").on("submit",(e)=>{
  const topic=$('#add-topic__text').val();
  const theme={
    text: topic,
    time: firebase.database.ServerValue.TIMESTAMP,
};
  e.preventDefault();


  if (topic === '') {
    return;
  }
  firebase
    .database()
    .ref('topics')
    .push(theme)
    .then(()=>{
      $("#exampleModal").modal('hide');
      resetModal();
      console.log(topic);
      spotList.push(topic);
      console.log(spotList);
    });


});


// ルーレット

var startBtn = document.getElementById('start');
var isStart = false;
var roulette = document.getElementById('roulette');
var place = '';
var intervalID = -1;


// リストデータ



// スタートボタンを押したときの処理
function clickedStart() {
    'use strict';
    isStart = true;
    startBtn.disabled = true;
    intervalID = setInterval(function() {
        if(isStart === true) {
            place = spotList[Math.floor( Math.random() * spotList.length )];
            roulette.className = 'name';
            document.getElementById("isPlace").innerHTML = place;
        }
    }, 100);
}

// ストップボタンを押した時の処理
function clickedStop() {
    'use strict';
    clearTimeout(intervalID);
    startBtn.disabled = "";
    isStart = false;
    if(place === '') {
        alert("スタートボタンを押してからストップボタンを押してね！");
    } else {
// 結果を画面に表示
    roulette.className = 'name';
    document.getElementById("isPlace").innerHTML = place;
    }
}
