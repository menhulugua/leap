import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import avatarPic from '../public/bruce-banner.jpeg'
import { useState, useRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faChevronLeft, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const Edit = 'Edit';
const Save = 'Save';
const states = ['New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia', 'Australian Capital Territory', 'Northern Territory'];
const defaultDetail = {
  firstName: 'Bruce',
  lastName: 'Banner',
  email: 'bruce.banner@marvel.com',
  phone: '0200000000',
  postcode: '2000',
  State: 'New South Wales',
  company: 'Marvel',
  abn: '12123123123',
  rate: '379',
  dob: '5-21-1970'
};

export default function Home() {
  const [buttonText, setButtonText] = useState(Edit);
  const [birthday, setBirthday] = useState(new Date(defaultDetail.dob));
  const [userDetail, setUserDetail] = useState(defaultDetail);
  const [hasError, setHasError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const checkError = (ref) => {
    let value = ref.current.value;
    switch (ref.current.name) {
      case 'firstName':
        if (!value.trim().length) {
          firstNameErrorRef.current.innerHTML = `<div>Your first name is required</div>`;
          firstNameRef.current.className = 'error';
          setHasError(true);
        }
        else {
          firstNameErrorRef.current.innerHTML = null;
          firstNameRef.current.className = '';
          setHasError(false);
        }
        break;
      case 'lastName':
        if (!value.trim().length) {
          lastNameErrorRef.current.innerHTML = `<div>Your last name is required</div>`;
          lastNameRef.current.className = 'error';
          setHasError(true);
        }
        else {
          lastNameErrorRef.current.innerHTML = null;
          lastNameRef.current.className = '';
          setHasError(false);
        }
        break;
      case 'email':
        if (!value.trim().length) {
          emailErrorRef.current.innerHTML = `<div>Your email is required</div>`;
          emailRef.current.className = 'error';
          setHasError(true);
        }
        else if (!validEmail(value)) {
          emailErrorRef.current.innerHTML = `<div>Your email is not valid</div>`;
          emailRef.current.className = 'error';
          setHasError(true);
        }
        else{
          emailErrorRef.current.innerHTML = null;
          emailRef.current.className = '';
          setHasError(false);
        }
        break;
      case 'phone':
        if (!value.trim().length) {
          phoneErrorRef.current.innerHTML = `<div>Your phone number is required</div>`;
          phoneRef.current.className = 'error';
          setHasError(true);
        }
        else if (!validPhoneNumber(value)) {
          phoneErrorRef.current.innerHTML = `<div>Your phone number is not valid</div>`;
          phoneRef.current.className = 'error';
          setHasError(true);
        }
        else {
          phoneErrorRef.current.innerHTML = null;
          phoneRef.current.className = '';
          setHasError(false);
        }
        break;
      case 'postcode':
        if (!value.trim().length) {
          postcodeErrorRef.current.innerHTML = `<div>Your postcode is required</div>`;
          postcodeRef.current.className = 'error';
          setHasError(true);
        }
        else if (!validPostcode(value)) {
          postcodeErrorRef.current.innerHTML = `<div>Your postcode is not valid</div>`;
          postcodeRef.current.className = 'error';
          setHasError(true);
        }
        else {
          postcodeErrorRef.current.innerHTML = null;
          postcodeRef.current.className = '';
          setHasError(false);
        }
        break;
      case 'rate':
        if (!value.trim().length) {
          rateErrorRef.current.innerHTML = `<div>Your hourly rate is required</div>`;
          rateRef.current.className = 'error';
          setHasError(true);
        }
        else if (isNaN(value)) {
          rateErrorRef.current.innerHTML = `<div>Your hourly rate must be a number</div>`;
          postcodeRef.current.className = 'error';
          setHasError(true);
        }
        else {
          rateErrorRef.current.innerHTML = null;
          postcodeRef.current.className = '';
          setHasError(false);
        }
        break;
    }
  }

  const validPostcode = (postcode) => {
    if (isNaN(postcode))
      return false;
    if (postcode.length !== 4)
      return false;
    if (parseInt(postcode) != postcode)
      return false;
    return true;
  }

  const validPhoneNumber = (number) => {
    if (isNaN(number))
      return false;
    if (number.length !== 10)
      return false;
    if (parseInt(number) != number)
      return false;
    return true;
  }

  const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEdit = () => {
    if (buttonText === Edit)
      setButtonText(Save);
    else {
      if (!hasError) {
        setButtonText(Edit);
        updateUserDetails();
      }
    }
  }

  const updateUserDetails = () => {
    setUserDetail(
      {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        postcode: postcodeRef.current.value,
        State: stateRef.current.value,
        company: companyRef.current.value,
        abn: abnRef.current.value,
        rate: rateRef.current.value,
        dob: birthday
      }
    )
  }

  const handleUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const uploadRef = useRef(null);

  const clickUpload = () => {
    uploadRef.current.click();
  }

  const viewResume = () => {
    alert(`Some file viewer to view ${selectedFile.name}`);
  }

  const discardEdit = () => {
    setHasError(false);
    setButtonText(Edit);
    firstNameRef.current.value = userDetail.firstName;
    lastNameRef.current.value = userDetail.lastName;
    emailRef.current.value = userDetail.email;
    phoneRef.current.value = userDetail.phone;
    postcodeRef.current.value = userDetail.postcode;
    stateRef.current.value = userDetail.state;
    companyRef.current.value = userDetail.company;
    abnRef.current.value = userDetail.abn;
    rateRef.current.value = userDetail.rate;
    setBirthday(new Date(userDetail.dob));

    firstNameRef.current.className = '';
    lastNameRef.current.className = '';
    emailRef.current.className = '';
    phoneRef.current.className = '';
    postcodeRef.current.className = '';
    postcodeRef.current.className = '';

    firstNameErrorRef.current.innerHTML = null;
    lastNameErrorRef.current.innerHTML = null;
    emailErrorRef.current.innerHTML = null;
    phoneErrorRef.current.innerHTML = null;
    postcodeErrorRef.current.innerHTML = null;
    postcodeErrorRef.current.innerHTML = null;
  }

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const postcodeRef = useRef(null);
  const stateRef = useRef(null);
  const companyRef = useRef(null);
  const abnRef = useRef(null);
  const rateRef = useRef(null);

  const firstNameErrorRef = useRef(null);
  const lastNameErrorRef = useRef(null);
  const emailErrorRef = useRef(null);
  const phoneErrorRef = useRef(null);
  const postcodeErrorRef = useRef(null);
  const rateErrorRef = useRef(null);

  return (
    <div>
      <Head>
        <title>My Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles['container-header']}>
          <h1>{buttonText === Save && <span><FontAwesomeIcon onClick={discardEdit} icon={faChevronLeft}></FontAwesomeIcon></span>}My Account</h1>
          <div>
            <button onClick={handleEdit}>{buttonText}</button>
          </div>    
        </div>
      </header>
      <main>
        <div className={styles['container-main']}>
          <div className={styles['user-header']}>
            <div>
              <Image className={styles['user-avatar']} src={avatarPic} alt="user avatar" width={70} height={70} />
            </div>          
            <div className={styles['user-name']}>
              <h2>{userDetail.firstName} {userDetail.lastName}</h2>
              <button onClick={viewResume}>View Resume</button>
            </div>
            <div>
              <button className={styles.upload} onClick={clickUpload}>Upload Resume</button>
              <input ref={uploadRef} className={styles['hidden-upload']} type="file" name="file" onChange={handleUpload} />
            </div>
          </div>
          <form className={styles['user-info']}>
            <fieldset disabled={buttonText === Edit}>
              <div className={styles['form-item']}>
                <label>First Name</label>
                <input name="firstName" ref={firstNameRef} defaultValue={userDetail.firstName} onBlur={() => checkError(firstNameRef)} type="text" />
                <div ref={firstNameErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Last Name</label>
                <input name="lastName" ref={lastNameRef} defaultValue={userDetail.lastName} onBlur={() => checkError(lastNameRef)} type="text" />
                <div ref={lastNameErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Email</label>
                <input name="email" ref={emailRef} defaultValue={userDetail.email} onBlur={() => checkError(emailRef)} type="email" />
                <div ref={emailErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Phone Number</label>
                <input name="phone" ref={phoneRef} defaultValue={userDetail.phone} onBlur={() => checkError(phoneRef)} type="text" />
                <div ref={phoneErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={`${styles['form-item']} ${styles.postcode}`}>
                <label>Postcode</label>
                <input name="postcode" ref={postcodeRef} defaultValue={userDetail.postcode} onBlur={() => checkError(postcodeRef)} type="text" />
                <div ref={postcodeErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={`${styles['form-item']} ${styles.state}`}>
                <label>State</label>
                <select name="state" ref={stateRef} defaultValue={userDetail.state}>
                  {states.map(state => (
                    <option key={state} defaultValue={state}>{state}</option>
                  ))}
                </select>
                <div className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Company Name</label>
                <input name="company" ref={companyRef} defaultValue={userDetail.company} type="text" />
                <div className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>ABN</label>
                <input name="abn" ref={abnRef} defaultValue={userDetail.abn} type="text" />
                <div className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Hourly Rate</label>
                <FontAwesomeIcon className={styles['dollar-sign']} icon={faDollarSign}></FontAwesomeIcon>
                <div className={styles.line}></div>
                <input className={styles.rate} name="rate" ref={rateRef} defaultValue={userDetail.rate}  onBlur={() => checkError(rateRef)} type="text" />
                <div ref={rateErrorRef} className={styles['error-message']}></div>
              </div>
              <div className={styles['form-item']}>
                <label>Date of Birth</label>
                <DatePicker selected={birthday} className={styles['date-picker']} onChange={(date) => setBirthday(date)} />
                <div className={styles['error-message']}></div>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  )
}
