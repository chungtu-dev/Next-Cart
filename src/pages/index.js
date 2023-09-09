"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const index = () => {
  /* #region  state */
  const [province, setProvince] = useState([])
  const [district, setDistrict] = useState([])
  const [ward, setWard] = useState([])

  const [provinceID, setProvinceID] = useState('')
  const [districtID, setDistrictID] = useState('')
  const [wardID, setWardID] = useState('')

  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [imgProfile, setImgProfile] = useState();
  const [activeStatus, setActiveStatus] = useState(false)
  // const [data, setData] = useState([])

  /* #endregion */

  /* #region  call api get PROVINCE */
  useEffect(() => {
    const getListProvince = () => {
      axios.get('https://vapi.vnappmob.com/api/province/')
        .then((response) => {
          if (response.status === 200) {
            const { data } = response //data is result of response
            setProvince(data.results)
          } else {
            console.log("list Province not found!");
          }
        })
    }
    getListProvince()
  }, [])
  /* #endregion */

  /* #region  handle get PROVINCE ID */
  const handleGetProvinceId = (e) => {
    const getProvinceID = e.target.value
    // console.log(getProvinceID, province);
    setProvinceID(getProvinceID)
  }
  /* #endregion */

  /* #region  call api get DISTRICT after get PROVINCE ID */
  useEffect(() => {
    const getListDistrict = () => {
      if (provinceID) {
        axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceID}`)
          .then((response) => {
            if (response.status === 200) {
              const { data } = response
              setDistrict(data.results)
            } else {
              console.log("list District not found!");
            }
          })
      }
    }
    getListDistrict()
  }, [provinceID])
  /* #endregion */

  /* #region  handle get DISTRICT ID */
  const handleGetDistrictId = (e) => {
    const getDistrictID = e.target.value
    // console.log(getDistrictID, district);
    setDistrictID(getDistrictID)
  }
  /* #endregion */

  /* #region  get api WARD after get DISTRICT ID */
  useEffect(() => {
    const getListWard = () => {
      if (districtID) {
        axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtID}`)
          .then((response) => {
            if (response.status === 200) {
              const { data } = response
              setWard(data.results)
            } else {
              console.log("list Ward not found!");
            }
          })
      }
    }
    getListWard()
  }, [districtID])
  /* #endregion */

  /* #region  handle get WARD ID */
  const handleGetWardId = (e) => {
    const getWardID = e.target.value;
    setWardID(getWardID)
  }
  /* #endregion */

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImgProfile(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmitUser = async (e) => {
    const id = Math.floor(100000 + Math.random() * 900000)
    const p_name = province.filter((p) => p.province_id === provinceID).shift().province_name
    const d_name = district.filter((d) => d.district_id === districtID).shift().district_name
    const w_name = ward.filter((w) => w.ward_id === wardID).shift().ward_name
    const info = {
      ID: id.toString(),
      NAME: name,
      GENDER: gender,
      PROVINCE: p_name,
      DISTRICT: d_name,
      WARD: w_name,
      IMG: imgProfile ? imgProfile : 'https://cdn.pixabay.com/photo/2023/06/13/11/35/crab-8060744_1280.jpg',
      ADMIN: activeStatus,
    }
    return await axios.post('http://localhost:4000/user', info).then(resp => {
      console.log(info);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <>
      <div className='container-form'>

        <input type="file" onChange={handleChange} />
        {
          imgProfile && <img src={imgProfile} className='container-form-img' />
        }

        <div className='container-form_inputName'>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='container-form_inputName'>
          <span>Admin</span>
          <input type="checkbox" checked={activeStatus} onChange={(e) => setActiveStatus(e.target.checked)} />
        </div>

        <div className="container-form_selectLocation">
          <select onChange={(e) => handleGetProvinceId(e)}>
            <option value="province">Chọn Tỉnh Thành</option>
            {
              province.map((p, index) => (
                <option key={index} value={p.province_id}>{p.province_name}</option>
              ))
            }
          </select>

          <select onChange={(e) => handleGetDistrictId(e)}>
            <option value="district">Chọn Quận Huyện</option>
            {
              district.map((d, index) => (
                <option key={index} value={d.district_id}>{d.district_name}</option>
              ))
            }
          </select>

          <select onChange={(e) => handleGetWardId(e)}>
            <option value="ward">Chọn Phường Xã</option>
            {
              ward.map((w, index) => (
                <option key={index} value={w.ward_id}>{w.ward_name}</option>
              ))
            }
          </select>
        </div>

        <div className='container-form_choseGender' onChange={(e) => setGender(e.target.value)}>
          <div>
            <input type="checkbox" name="gender" value="Nam" checked={gender === 'Nam'} readOnly /> Nam
          </div>
          <div>
            <input type="checkbox" name="gender" value="Nữ" checked={gender === 'Nữ'} readOnly /> Nữ
          </div>
        </div>

        <button className='button_submit' onClick={() => handleSubmitUser()}>Submit - JSV</button>
      </div>
    </>
  )
}

export default index