import './dist/css/main.min.css';
import {useState, useEffect} from 'react'
import Messages from './components/Messages'
import Profile from './components/Profile'
import ProfileLink from './components/ProfileLink'
import SendMessage from './components/SendMessage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import OtherUser from './components/OtherUser'
import Loading from './components/Loading'
import ThemeSwitch from './components/ThemeSwitch'
import {signUp, signIn} from './helpers/auth'
import { auth } from './services/firebase'
import { db } from './services/firebase'
import {storage} from './services/firebase'
import Resizer from 'react-image-file-resizer'

function App() {
  const [user, setUser] = useState(null)
  const [nickName, setNickName] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [wantsToSignUp, setWantsToSignUp] = useState(false)
  const [wantsToLogin, setWantsToLogin] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showOtherUser, setShowOtherUser] = useState(false)
  const [showLogOrSign, setShowLogOrSign] = useState(true)
  const [edit, setEdit] = useState(true)
  const [otherUser, setOtherUser] = useState({})
  const [avatarsURL, setAvatarsURL] = useState({})
  const [light, setLight] = useState(false)

  const resizeFile = (file) => new Promise(resolve => {
    console.log('file resizer')
    Resizer.imageFileResizer(file, 600, 600, 'WEBP', 100, 0,
      uri => {
        resolve(uri)
      },
      'file'
    )
  })

  const themeSwitch = () => {
    const body = document.getElementsByTagName('body')[0]
    const html = document.getElementsByTagName('html')[0]
    const sun = document.getElementById('sun')
    const moon = document.getElementById('moon')
    if (!light) {
      html.classList.add('dark-html')
      body.classList.add('dark-bd')
      moon.classList.add('hide')
      sun.classList.remove('hide')
      setLight(true)
    } else {
      html.classList.remove('dark-html')
      body.classList.remove('dark-bd')
      moon.classList.remove('hide')
      sun.classList.add('hide')
      setLight(false)
    }
  }

  const validatePassword = pass => {
    const validCharacters = /^[0-9a-zA-Z]+$/i
    if(pass.match(validCharacters)) {
      return true
    } else {
      return false
    }
  }

  const showOtherUsers = async (username, path) => {
    try {
      await db.ref('bio/' + path).once('value').then(snapshot => {
        console.log(snapshot.val())
        setOtherUser({
          username: username,
          photoURL: avatarsURL[path],
          otherBio: snapshot.val().bio
        })
      })
    } catch(error) {
      console.log(error.message)
    }
    setShowChat(false)
    setShowOtherUser(true)
  }

  const updateBio = async () => {
    const bioVal = document.getElementById('bio').value
    const [mail] = user.email.split('.')

    try {
      await db.ref('bio/' + mail).set({
        bio: bioVal
      }).then( () => {
        db.ref('bio/' + mail).once('value').then(snapshot => setBio(snapshot.val().bio))
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const getBio = async (mail) => {
    const [path] = mail.split('.')
    const tempBio = await db.ref('bio/' + path).once('value').then(snapshot => snapshot.val())
    setBio(tempBio.bio)
  }

  const updateScroll = () => {
    const chat = document.getElementById('chat')
    chat.scrollTop = chat.scrollHeight
  }

  const handleSwitchEditSave = (e) => {
    const userInput = document.getElementById('userInput')
    setEdit(false)
    userInput.style['pointerEvents'] = 'all'
    userInput.select()
  }

  const handleInputImg = () => {
    document.getElementById('avatar').click()
  }

  const handleShowChat = () => {
    setShowProfile(false)
    setShowOtherUser(false)
    setShowChat(true)
    setTimeout(() => {
      updateScroll()
    }, 10)
  }

  const handleShowProfile = () => {
    setShowChat(false)
    setShowProfile(true)
    document.getElementById('body').style['background-color'] = '#fffef7'
  }

  const handleSwitch = () => {
    if (wantsToLogin) {
      document.getElementById('login').classList.add('left')
      document.getElementById('signUp').classList.remove('right')
    } else if (wantsToSignUp) {
      document.getElementById('signUp').classList.add('right')
      document.getElementById('login').classList.remove('left')
    }
    setWantsToSignUp(!wantsToSignUp)
    setWantsToLogin(!wantsToLogin)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (wantsToSignUp && validatePassword(password)) {
      setLoading(true)
      try {
        await signUp(email, password).then(() => {
          auth().currentUser.updateProfile({
            displayName: nickName
          }).then(() => {
            const [path] = auth().currentUser.email.split('.')
            setUser({...auth().currentUser})
            try {
                db.ref('bio/' + path).set({
                bio: ''
              }).then( () => {
                db.ref('bio/' + path).once('value').then(snapshot => {
                  const tempBio = snapshot.val()
                  setBio(tempBio.bio)
                })
              })
            } catch (error) {
              console.log(error.message)
            }
            setLoading(false)
            setShowLogOrSign(false)
            setShowProfile(true)
          })
          setEmail('')
          setPassword('')
        })
      } catch (error) {
        setLoading(false)
        alert(error.message)
      }
    } else if (wantsToLogin) {
      setLoading(true)
      try {
        await signIn(email,password).then(response => {
          setUser(response.user)
          setShowLogOrSign(false)
          setShowChat(true)
          setNickName(response.user.displayName)
          console.log(response.user)
          setEmail('')
          setPassword('')
          getBio(response.user.email)
          setLoading(false)
          setTimeout(() => {
            updateScroll()
          }, 1000)
        })
      } catch (error) {
        setLoading(false)
        setPassword('')
        alert(error.message)
      }
    } else {
      const input = document.getElementById('passwordInput')
      const passwordInfo = document.getElementById('passwordInfo')
      passwordInfo.style['color'] = 'rgba(250, 70, 70, 0.8)'
      input.style['backgroundColor'] = 'rgba(250, 70, 70, 0.2)'
      setTimeout(() => {
        input.style['backgroundColor'] = '#FFFFFF'
        passwordInfo.style['color'] = 'slategrey'
      }, 5000)
    }
  }

  const handleChangeUsername = async (e) => {
    const userInput = document.getElementById('userInput')
    userInput.style['pointerEvents'] = 'none'
    auth().currentUser.updateProfile({displayName: nickName}).then(() => setUser({...auth().currentUser}))
    setEdit(true)
  }

  const handleUploadAvatar = async e => {
    const storageRef = storage.ref()
    const usersAvatarRef = storageRef.child('chatAvatars/' + user.email)
    const img = e.target.files[0]
    const [path] = user.email.split('.')
    if (img) {
      setLoading(true)
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = async () => {
        try {
          console.log(img)
          const newImg = await resizeFile(img)
          await usersAvatarRef.put(newImg).then(() => {
            try {
                storage.ref('chatAvatars/' + user.email).getDownloadURL().then( url => {
                  auth().currentUser.updateProfile({photoURL: url}).then( () => setUser({...auth().currentUser}))
                  db.ref('avatar/' + path).set(url).then(setLoading(false))
              })
            } catch (error) {
              console.log(error.message)
            }
          })
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }

  const handleSendMessage = async () => {
    const hour = new Date().getHours().toString()
    let minutes = new Date().getMinutes().toString()
    minutes = minutes.length === 2 ? minutes : '0' + minutes
    const [path] = user.email.split('.')
    try {
      await db.ref('messages').push({
        user: user.displayName,
        message: document.getElementById('userMessage').value,
        timestamp: hour + ':' + minutes,
        path: path
      })
      document.getElementById('userMessage').value = ''
      setTimeout(() => {
        updateScroll()
      }, 50)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEnter = e => { 
    if (e.key === 'Enter') {
        handleSendMessage()
    }
  }
  
  useEffect(() => {
    try {
      db.ref('messages').on('value', snapshot => {
        let messagesArray = []
        snapshot.forEach((snap) => {
          messagesArray.push(snap.val())
        })
        setLoading(false)
        setMessages(messagesArray)
      })
      db.ref('avatar').on('value', snapshot => {
        setAvatarsURL(snapshot.val())
      })
    } catch (error) {
      console.log(error.message)
    }
  },[])

  return (
    <div>
      <ThemeSwitch id='themeSiwtch' handleClick={themeSwitch} light={light} />
      {
        showLogOrSign &&
        <div>
          <div id='login' className='up-in-container'>
            <Login email={email} 
                  password={password} 
                  handleSubmit={handleSubmit} 
                  setEmail={setEmail} 
                  setPassword={setPassword} 
                  handleSwitch={handleSwitch}
            />
          </div>
          <div id='signUp' className='up-in-container right'>
          <SignUp email={email} 
                  password={password}
                  nickName={nickName} 
                  handleSubmit={handleSubmit} 
                  setEmail={setEmail} 
                  setPassword={setPassword} 
                  handleSwitch={handleSwitch}
                  setNickName={setNickName} 
                  validate={validatePassword}
          />
          </div>
        </div>
      }
      {
        showProfile &&
        <Profile 
                user={user} 
                nickName={nickName}
                edit={edit} 
                setNickName={setNickName} 
                handleChangeUsername={handleChangeUsername} 
                handleUploadAvatar={handleUploadAvatar}
                handleInputImg={handleInputImg} 
                handleSwitchEditSave={handleSwitchEditSave}
                handleShowChat={handleShowChat}
                bio={bio}
                updateBio={updateBio}
        />
      }
      {
        showChat &&
        <div id='chatContainer' className='chat-container'>
          <ProfileLink user={user} handleShowProfile={handleShowProfile} />
          <Messages messages={messages} loading={loading} showOtherUsers={showOtherUsers} avatarsURL={avatarsURL} />
          <SendMessage handleSendMessage={handleSendMessage} handleEnter={handleEnter} />
        </div>
      }
      {
        showOtherUser &&
        <OtherUser otherUser={otherUser} handleShowChat={handleShowChat} />
      }
      {
        loading &&
        <Loading />
      }
    </div>
  );
}

export default App;
