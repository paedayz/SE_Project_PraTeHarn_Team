const {firebase, firestore, admin} = require("../util/firebase")

exports.addQuest = (req, res) => {
    let questId
    let allUsername = []
    const questData = req.body.questData
    firestore.collection('quests').add(questData)
        .then((docRef) => {
            questId = docRef.id
            return firestore.collection('users').get()
        })
        .then( async (snapshot) => {
            snapshot.forEach((doc) => {
                allUsername.push(doc.id)
            })

            const addQuestPromise = allUsername.map((username) => {
                return firestore.collection('quest_user').add({
                    username: username,
                    questId: questId,
                    questStatus: 'in_progress',
                    questDone: 0,
                    questType: req.body.questData.questType
                })
            })

            const resData = await Promise.all(addQuestPromise)
                                .then(() => {
                                    return firestore.doc(`quests/${questId}`).get()
                                })
                                .then((doc) => {
                                    let buff = doc.data()
                                    buff.docId = doc.id
                                    return buff
                                })
                                .catch((err) => {
                                    console.log(err)
                                    return res.json({error: err})
                                  })
            
            return res.json({data: resData})
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}

exports.adminGetQuestList = (req, res) => {
    let adminQuestList = []
    firestore.doc(`/users/${req.user.username}`).get()
        .then(doc => {
            if(doc.data().status === "admin") {
                return firestore.collection('quests').get()
            } else {
                return res.status(403).json({error: 'No permission to get data'})
            }
        })
        .then((snapshot) => {
            if(snapshot.size) {
                snapshot.forEach((doc) => {
                    adminQuestList.push(doc.data())
                })
                return res.json({data: adminQuestList})
            }
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}

exports.doQuest = (req, res) => {
    let username = req.user.username
    let questAction = req.body.questAction
    let mainQuestData = []
    let resUpdateQuest = []

    firestore.collection('quests').where('questAction', '==', questAction).get()
        .then((snapshot) => {
            if(snapshot.size !== 0) {
                snapshot.forEach((doc) => {
                    mainQuestData.push({
                        questId : doc.id,
                        questRequirement: doc.data().questRequirement
                    })
                })
                
                return firestore.collection('quest_user').where('username', '==', username).get()
            } else {
                return res.status(403).json({err: 'That quest is delete already'})
            }
           
        })
        .then( async (snapshot) => {
            
            if(snapshot.size) {
                snapshot.forEach((doc) => {
                    mainQuestData.map((data) => {
                        if(doc.data().questStatus === 'in_progress' && doc.data().questId === data.questId) {
                            let newData = {
                                questDone: doc.data().questDone + 1,
                                questId: doc.data().questId,
                                questStatus: 'in_progress',
                                questType: doc.data().questType,
                                username: doc.data().username,
                                docId: doc.id
                            }
    
                            if(newData.questDone === data.questRequirement) {
                                newData.questStatus = 'quest_success'
                            }
    
                            firestore.doc(`/quest_user/${doc.id}`).set(newData)
                            
                            resUpdateQuest.push(newData)
                        }
                    })
                })
                return res.json({data: resUpdateQuest})
            }
            
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}

exports.deleteQuest = (req, res) => {
    const questId = req.body.questId
    let mainQuestId
    let docIdToDelete = []
    let batch = firestore.batch()
    let path = firestore.collection('quest_user')
    firestore.doc(`/quests/${questId}`).get()
        .then((doc) => {
            mainQuestId = doc.id
            return firestore.doc(`/quests/${questId}`).delete()
        })
        .then(() => {
            return firestore.collection('quest_user').where('questId', '==', questId).get()
        })
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                docIdToDelete.push(doc.id)
            })

            docIdToDelete.map((docId) => {
                batch.delete(path.doc(docId))
            })
            batch.commit()
            return res.status(200).json({data: questId})
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}

exports.editQuest = (req, res) => {
    const mainQuestId = req.body.questId
    const updateQuestData = req.body.updateQuestData
    const resData = updateQuestData
    resData.questId = mainQuestId

    firestore.doc(`/quests/${mainQuestId}`).update(updateQuestData)
        .then(() => {
            return res.json({data: resData})
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}

exports.getUserQuest = (req, res) => {
    let username = req.user.username
    let questList = []
    let userQuest = []

    firestore.collection("quest_user").where("username", "==", username).get()
        .then(async(snapshot) => {
            snapshot.forEach((doc) => {
                let buff = doc.data()
                buff.docId = doc.id
                userQuest.push(buff)
            })

            let questDataPromise = userQuest.map((quest) => {
                return firestore.doc(`/quests/${quest.questId}`).get()
            })

            Promise.all(questDataPromise)
                                .then((data) => {
                                    data.map((doc) => {
                                        questList.push(doc.data())
                                    })
                                    let num = 0
                                    userQuest.map((quest) => {
                                        questList[num].questDone = quest.questDone
                                        questList[num].questStatus = quest.questStatus
                                        questList[num].questType = quest.questType
                                        questList[num].username = quest.username
                                        questList[num].docId = quest.docId
                                        num = num+1
                                    })
                                    console.log(userQuest)
                                    return res.json({data: questList})
                                })
                                .catch((err) => {
                                    return err
                                })
        })
        .catch((err) => {
            console.log(err)
            return res.json({error: err})
          })
}