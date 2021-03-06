const { firebase, firestore, admin } = require("../util/firebase");
const config = require("../util/config");
const { reduceUserDetails } = require("../util/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    nickname: req.body.nickname,
  };

  //   const { valid, errors } = validateLoginData(user);

  //   if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  let userId;

  firestore
    .doc(`users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({
          username: "This username is already taken",
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return firestore.collection('quests').get()
    })
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        firestore.collection('quest_user').add({
          username: newUser.username,
          questId: doc.id,
          questStatus: 'in_progress',
          questDone: 0,
          questType: doc.data().questType
        })
      })
      return firestore.collection('achievements').get()
    })
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        firestore.collection('achievement_user').add({
          username: newUser.username,
          achievementId: doc.id,
          achievementStatus: 'in_progress',
          achievementDone: 0,
        })
      })
    })
    .then(() => {
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        nickname: newUser.nickname,
        createdAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
        }),
        last_login: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
        }),
        userImage: `https://firebasestorage.googleapis.com/v0/b/${config.firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        userId,
        status: "user",
        level: 0,
        exp: 0,
        coin: 0,
        theme: null,
      };

      firestore.doc(`/users/${newUser.username}`).set(userCredentials);
      return res.json({ data: userCredentials });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  let userId
  let username
  let last_login
  let midnight
  let loginQuestId
  //   const { valid, errors } = validateLoginData(user);

  //   if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      userId = data.user.uid
      return firestore.collection('users').where("userId", "==", userId).get()
    })
    .then((snapshot) => {
      midnight = (new Date()).setHours(0, 0, 0, 0)
      snapshot.forEach( async (doc) => {
        last_login = new Date(doc.data().last_login)
        username = doc.id
      })
      return firestore.collection('quests').where('questAction', '==', 'login').get()
    })
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        loginQuestId = doc.id
      })
      return firestore.collection('quest_user').where('username', '==', username).get()
    })
    .then(async (snapshot) => {
      if(snapshot.size > 0 && last_login - midnight <= 0){
        const resetQuestReqPromise = snapshot.forEach((doc) => {
          if((doc.data().questType === 'Daily' && doc.data().questId !== loginQuestId) || (doc.data().questStatus === 'quest_claim' && doc.data().questId !== loginQuestId)) {
            return firestore.doc(`quest_user/${doc.id}`).update({questDone:0, questStatus: 'in_progress'})
          } else if(doc.data().questType === 'Daily' && doc.data().questId === loginQuestId) {
            console.log('yesssss')
            return firestore.doc(`quest_user/${doc.id}`).update({questDone:1, questStatus: 'quest_success'})
          } else {
            return 'not daily'
          }
        })
        
        Promise.all(resetQuestReqPromise)
          .then((data) => {
            return null
          })
          .catch((err) => {
            console.log(err)
            return null
          })
      } else {
        return null
      }
    }) 
    .then(() => {
      return firestore.doc(`users/${username}`).update({last_login: new Date().toLocaleString("en-US", {timeZone: "Asia/Bangkok"})});
    })
    .then(() => {
      return firestore.collection("users").where("userId", "==", userId).get();
    })
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        return res.json({ data: doc.data() });
      });
    })
    .catch((err) => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

exports.checkAuthen = (req, res) => {
  console.log("check");
  const clientUserId = req.body.clientUserId;
  let username;
  let userData = {};
  let events = [];
  let notifications = [];
  let friendRequest = [];
  let friendList = [];
  let questList = []
  let achievementList = []

  let friendListToFetch = [];
  let friendRequestToFetch = [];

  let friendRequestDocId = [];
  firestore
    .collection("users")
    .where("userId", "==", clientUserId)
    .get()
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        userData = doc.data();
      });
      username = userData.username;
      return firestore
        .collection("events")
        .where("username", "==", username)
        .get();
    })
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        let newData = {
          date: doc.data().date,
          detail: doc.data().detail,
          event: doc.data().event,
          key: doc.data().key,
          rank: doc.data().rank,
          start: doc.data().start,
          end: doc.data().end,
          catagory: doc.data().catagory,
          success: doc.data().success,
          docId: doc.id
        };
        events.push(newData);
      });
      return firestore
        .collection("friend")
        .where("recipient", "==", username)
        .get();
    })
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().accept) {
          friendListToFetch.push(doc.data().sender);
        } else {
          friendRequestToFetch.push(doc.data().sender);
          friendRequestDocId.push(doc.id);
        }
      });
      return firestore
        .collection("friend")
        .where("sender", "==", username)
        .get();
    })
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().accept) {
          friendListToFetch.push(doc.data().recipient);
        }
      });

      const friendListPromise = friendListToFetch.map((username) => {
        return firestore.doc(`/users/${username}`).get();
      });

      const friendRequestPromise = friendRequestToFetch.map((username) => {
        return firestore.doc(`/users/${username}`).get();
      });

      Promise.all(friendListPromise)
        .then((data) => {
          data.forEach((doc) => {
            friendList.push(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ error: err });
        });

      Promise.all(friendRequestPromise)
        .then((data) => {
          data.forEach((doc) => {
            friendRequest.push(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ error: err });
        });

      return firestore
        .collection("quest_user")
        .where("username", "==", userData.username)
        .get();
    })
    .then(async(snapshot) => {
      let questDataPromise = snapshot.forEach((doc) => {
        let questDone = doc.data().questDone
        let docId = doc.id
        let questStatus = doc.data().questStatus
        let questType = doc.data().questType
        return firestore.doc(`/quests/${doc.data().questId}`).get()
                .then((data) => {
                  let resData = data.data()
                  resData.questDone = questDone
                  resData.docId = docId
                  resData.questStatus = questStatus
                  resData.questType = questType
                  questList.push(resData)
                  return resData
                })
      })
      let waitPromise = await Promise.all(questDataPromise)
                          .then((data) => {
                            return data
                          })
                          .catch((err) => {
                            return err
                          })
      return firestore
      .collection("achievement_user")
      .where("username", "==", userData.username)
      .get();
    })
    .then(async(snapshot) => {
      let achievementDataPromise = snapshot.forEach((doc) => {
        let achievementDone = doc.data().achievementDone
        let docId = doc.id
        let achievementStatus = doc.data().achievementStatus
        let achievementType = doc.data().achievementType
        return firestore.doc(`/achievements/${doc.data().achievementId}`).get()
                .then((data) => {
                  let resData = data.data()
                  resData.achievementDone = achievementDone
                  resData.docId = docId
                  resData.achievementStatus = achievementStatus
                  resData.achievementType = achievementType
                  achievementList.push(resData)
                  return resData
                })
      })
      let waitPromise = await Promise.all(achievementDataPromise)
                          .then((data) => {
                            return data
                          })
                          .catch((err) => {
                            return err
                          })
      return waitPromise
    })
    .then(() => {
      return firestore
        .collection("notifications")
        .where("username", "==", userData.username)
        .get();
    })
    .then((snapshot) => {
      snapshot.forEach(function (doc) {
        let newData = {
          createdAt: doc.data().createdAt,
          read: doc.data().read,
          toggle: doc.data().toggle,
          type: doc.data().type,
          data: doc.data().data,
          docId: doc.id,
        };
        notifications.push(newData);
      });

      let sortNotifications = notifications.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      let friendRequestBuff = [];
      let reqNum = 0;
      friendRequest.map((request) => {
        request.docId = friendRequestDocId[reqNum];
        friendRequestBuff.push(request);
        reqNum = reqNum + 1;
      });

      friendRequest = friendRequestBuff;

      const resData = {
        eventData: events,
        notiData: sortNotifications,
        userData: userData,
        friendList: friendList,
        friendRequest: friendRequest,
        questList: questList,
        achievementList: achievementList
      };
      return res.json(resData);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: err });
    });
};

exports.signout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false });
    });
};

exports.editProfile = (req, res) => {
  const userData = reduceUserDetails(req.body);

  if (!userData.errors) {
    firestore
      .doc(`/users/${req.user.username}`)
      .update(userData)
      .then(() => {
        return firestore
          .collection("users")
          .where("username", "==", req.user.username)
          .get();
      })
      .then((snapshot) => {
        snapshot.forEach(function (doc) {
          return res.json({ data: doc.data() });
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  } else {
    return res.status(500).json({ error: userData.errors });
  }
};
