import React, { Fragment, useContext, useState, useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom'
import {FirebaseContext, AuthContext} from '../../store/Context'

const Create = () => {

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const history = useHistory()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const date = new Date()

  useEffect(()=> {
    if(!user) {
      history.push('/');
    }
  },[])

  const handleSubmit = (e)=> {

    e.preventDefault()

    let valid = true;

    setNameError('');
    setCategoryError('');
    setPriceError('');
    setImageError('');

    if(name.trim()=="") {
      setNameError('Fill the Name !!')
      valid = false
    }

    if(category.trim()=='') {
      setCategoryError('Fill Category !!')
      valid = false
    }

    if(price.trim()=='') {
      setPriceError('Fill Price') 
      valid = false
    } else if(price < 0) {
      setPriceError('Invalid price')
      valid = false
    }

    if(!image) {
      setImageError('Select Image')
      valid = false
    }

    if(!valid) return


    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=> {
      ref.getDownloadURL().then((url)=>{
        
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId : user.uid,
          createdAt : date.toDateString()
        })
        history.push('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <p className='text-danger'>{nameError}</p>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <p className='text-danger'>{categoryError}</p>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} id="fname" onChange={(e)=>setPrice(e.target.value)} name="Price" />
            <p className='text-danger'>{priceError}</p>
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <p className='text-danger'>{imageError}</p>
          
            <br />
            <input onChange={(e)=> {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
