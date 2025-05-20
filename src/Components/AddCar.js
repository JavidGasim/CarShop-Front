import React, { useEffect, useRef, useState } from 'react';
import './AddCar.css';
import axios from "axios";
import { faMarker } from '@fortawesome/free-solid-svg-icons';

export default function AddCar() {
    const cookies = document.cookie.split(';');
    let docId = null;
    cookies.forEach(cookie => {
      const cookieParts = cookie.split('=');
      const cookieName = cookieParts[0].trim();
      if (cookieName === 'id') {
        docId = parseInt(cookieParts[1]);
      }
    });
    const[datas,setDatas] = useState([]);

    const jsonUrl = "http://localhost:27001/cars";
    const id = useRef(0);
    const [selectedOil,setSelectedOil] = useState("");
    const [selectedGear,setSelectedGear] = useState("");
    const [selectedGearBox,setSelectedGearBox] = useState("");
    const [selectedMarket,setSelectedMarket] = useState("");
    const [selectedOwners,setSelectedOwners] = useState("");

    const [marka,setMarka] = useState();
    const [model,setModel] = useState();
    const [banType,setBanType] = useState();
    const [march,setMarch] = useState();
    const [year,setYear] = useState();
    const [color,setColor] = useState();
    const [situation,setSituation] = useState();
    const [price,setPrice] = useState();
    const [engine,setEngine] = useState();
    const [city,setCity] = useState();
    const [url,setUrl] = useState();
    const [url2,setUrl2] = useState();
    const [url3,setUrl3] = useState();
    const [description,setDescription] = useState();

    function selectNewOil(e)
    {
      setSelectedOil(e.target.value);
    }

    function selectNewGear(e)
    {
      setSelectedGear(e.target.value);
    }

    function selectNewGearBox(e)
    {
      setSelectedGearBox(e.target.value);
    }

    function selectNewMarket(e)
    {
      setSelectedMarket(e.target.value);
    }

    function selectNewOwners(e)
    {
      setSelectedOwners(e.target.value);
    }

    function handleSubmit(e)
    {
      e.preventDefault();
      addNewCar();
    }
    
    function GetMovies()
    {
      axios.get(jsonUrl).then((d) => {
        setDatas(d.data);
      });
    }

    useEffect(() =>
    {
      GetMovies();
    })

    function addNewCar()
    {
      id.current = datas.length;
      id.current++;

      // document.cookie = `id=${id.current};path=/;`;
      const car={
        id:String(`${id.current}`),
        color: "white",
        isFav:false,
        url:url,
        url2:url2,
        url3:url3,
        price:price,
        city:city,
        Marka:marka,
        Model:model,
        GraduationYear:year,
        BanType:banType,
        Color:color,
        Engine:engine+"/"+selectedOil,
        March:march,
        GearBox:selectedGearBox,
        Gear:selectedGear,
        New:"",
        Owners:selectedOwners,
        Situation:situation,
        Market:selectedMarket,
        Description:description
      }
      axios.post(jsonUrl, car).then((data) => console.log(data));

      setUrl("");
      setPrice("");
      setCity("");
      setMarka("");
      setModel("");
      setYear("");
      setBanType("");
      setColor("");
      setEngine("");
      setSelectedOil("");
      setMarch("");
      setSelectedGearBox("");
      setSelectedGear("");
      setSelectedOwners("");
      setSituation("");
      setSelectedMarket("");
      setDescription("");
      setUrl2("");
      setUrl3("");



    }
  return (
    <section style={{paddingTop:"50px",paddingBottom:"50px",backgroundColor:"lightgray"}}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px"}}>
            <label>Marka</label>
            <input required value={marka} onChange={(e) => setMarka(e.target.value)}></input>
            <label style={{marginLeft:"70px"}}>Model</label>
            <input required value={model} style={{marginLeft:"150px"}} onChange={(e) => setModel(e.target.value)}></input>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Ötürücü</label>
            <select required style={{marginLeft:"77px"}} value={selectedGear} onChange={(e) => selectNewGear(e)}>
              <option value=""></option>
              <option value="Arxa">Arxa</option>
              <option value="Ön">Ön</option>
              <option value="Tam">Tam</option>
            </select>
            <label style={{marginLeft:"70px"}}>Yanacaq növü</label>
            <select required style={{marginLeft:"70px"}} value={selectedOil} onChange={(e) => selectNewOil(e)}>
              <option value=""></option>
              <option value="Benzin">Benzin</option>
              <option value="Dizel">Dizel</option>
              <option value="Qaz">Qaz</option>
              <option value="Elektro">Elektro</option>
              <option value="Hibrid">Hibrid</option>
              <option value="Plug-in Hibrid">Plug-in Hibrid</option>
            </select>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Ban növü</label>
            <select required style={{marginLeft:"65px"}} value={banType} onChange={(e) => setBanType(e.target.value)}>
              <option value=""></option>
              <option value="Avtobus">Avtobus</option>
              <option value="Dartqı">Dartqı</option>
              <option value="Fastbek">Fastbek</option>
              <option value="Fayton">Fayton</option>
              <option value="Furqon">Furqon</option>
              <option value="Helçbek,3 qapı">Helçbek,3 qapı</option>
              <option value="Helçbek,4 qapı">Helçbek,4 qapı</option>
              <option value="Helçbek,5 qapı">Helçbek,5 qapı</option>
              <option value="Kabriolet">Kabriolet</option>
              <option value="Karvan">Karvan</option>
              <option value="Kompakt-Van">Kompakt-Van</option>
              <option value="Kupe">Kupe</option>
              <option value="Kvadrosiki">Kvadrosiki</option>
              <option value="Liftbek">Liftbek</option>
              <option value="Limuzin">Limuzin</option>
              <option value="Mikroavtobus">Mikroavtobus</option>
              <option value="Mikrovan">Mikrovan</option>
              <option value="Minivan">Minivan</option>
              <option value="Moped">Moped</option>
              <option value="Motosiklet">Motosiklet</option>
              <option value="Offroader / SUV,3 qapı">Offroader / SUV,3 qapı</option>
              <option value="Offroader / SUV,5 qapı">Offroader / SUV,5 qapı</option>
              <option value="Offroader / SUV,açıq">Offroader / SUV,3 açıq</option>
              <option value="Sedan">Sedan</option>
              <option value="Yük maşını">Yük maşını</option>
              <option value="Van">Van</option>
            </select>
            {/* <input required value={banType} style={{marginLeft:"65px"}} placeholder='Ban növü' onChange={(e) => setBanType(e.target.value)}></input> */}
            <label style={{marginLeft:"70px"}}>Sürətlər qutusu</label>
            <select required style={{marginLeft:"55px"}} value={selectedGearBox} onChange={(e) => selectNewGearBox(e)}>
              <option value=""></option>
              <option value="Avtomat">Avtomat</option>
              <option value="Variator">Variator</option>
              <option value="Mexanika">Mexanika</option>
              <option value="Robot">Robot</option>
              <option value="Hibrid">Hibrid</option>
              <option value="Reduktor">Reduktor</option>
            </select>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Yürüş</label>
            <input required value={march} style={{marginLeft:"108px"}} onChange={(e) => setMarch(e.target.value)}></input>
            <label style={{marginLeft:"70px"}}>İl</label>
            <input required value={year} style={{marginLeft:"215px"}}  onChange={(e) => setYear(e.target.value)}></input>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Rəng</label>
            <input required value={color} style={{marginLeft:"110px"}}  onChange={(e) => setColor(e.target.value)}></input>
            <label style={{marginLeft:"70px"}}>Qiymət</label>
            <input required value={price} style={{marginLeft:"150px"}}  onChange={(e) => setPrice(e.target.value)}></input>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Vəziyyəti</label>
            <input required value={situation} style={{marginLeft:"70px"}} onChange={(e) => setSituation(e.target.value)}></input>
            <label style={{marginLeft:"65px"}}>Mühərrik gucu</label>
            <input required value={engine} style={{marginLeft:"65px"}} onChange={(e) => setEngine(e.target.value)}></input>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Hansi Bazar?</label>
            <select required style={{marginLeft:"25px"}} value={selectedMarket} onChange={(e) => selectNewMarket(e)}>
              <option value=""></option>
              <option value="Amerika">Amerika</option>
              <option value="Avropa">Avropa</option>
              <option value="Çin">Çin</option>
              <option value="Dubay">Dubay</option>
              <option value="Koreya">Koreya</option>
              <option value="Rusiya">Rusiya</option>
              <option value="Yaponiya">Yaponiya</option>
              <option value="Rəsmi Diler">Rəsmi Diler</option>
              <option value="Digər">Digər</option>
            </select>
            <label style={{marginLeft:"70px"}}>Sahib sayi</label>
            <select required style={{marginLeft:"119px"}} value={selectedOwners} onChange={(e) => selectNewOwners(e)}>
              <option value=""></option>
              <option value="Birinci">Birinci</option>
              <option value="İkinci">İkinci</option>
              <option value="Üçüncü">Üçüncü</option>
              <option value="Dördüncü">Dördüncü</option>
              <option value="Daha çox">Daha çox</option>
            </select>
        </section>

        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Şəhər</label>
            <input required value={city} style={{marginLeft:"105px"}} onChange={(e) => setCity(e.target.value)}></input>
            <label style={{marginLeft:"80px"}}>Url</label>
            <input required value={url} style={{marginLeft:"190px"}} onChange={(e) => setUrl(e.target.value)}></input>
        </section>
        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"20px"}}>
            <label>Url2</label>
            <input required value={url2} style={{marginLeft:"125px"}} onChange={(e) => setUrl2(e.target.value)}></input>
            <label style={{marginLeft:"75px"}}>Url3</label>
            <input required value={url3} style={{marginLeft:"180px"}} onChange={(e) => setUrl3(e.target.value)}></input>
        </section>
        <section style={{display:"flex",justifyContent:"start",paddingLeft:"30px",paddingRight:"30px",marginTop:"50px"}}>
            <label style={{marginLeft:"250px",marginTop:"50px"}}>Əlavə məlumat</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </section>

        <button type='submit'>ADD CAR</button>
      </form>
    </section>
  )
}
