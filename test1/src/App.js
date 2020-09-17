import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';
import { Modal } from '@material-ui/core'
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import { useConfirm } from "material-ui-confirm";


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 650,
    borderRadius: 10,

  },
  table: {
    minWidth: 650,
  },
}));


function createData(name, email, age, address, id) {
  return { name,  email, age, address, id };
}

export default function SimpleTable() {


  const confirm = useConfirm();

  const [item, setItem] = useState(0);
  const [rows,setRows] = useState([createData('Linda', 'khanhlinh.trinh070@gmail.com', 62, '24 Tạ Quang bửu', 827),
  createData('Jane', 'khanhlinh.trinh070@gmail.com', 39, '17 Trần Đại Nghĩa', 12),
  createData('Kate', 'khanhlinh.trinh070@gmail.com', 16, '28 Vương Thừa Vũ', 24),
  createData('Pinky','khanhlinh.trinh070@gmail.com', 30, '12 Khuất Duy Tiến ', 35),
  createData('Alex', 'khanhlinh.trinh070@gmail.com', 16, '08 Thái Hà', 41),]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [age,setAge] = useState("");
  const [address,setAddress] = useState("");
  const [id, setId]= useState("")



  const handleDelete = item => {
    confirm({description: `Are you sure delete this item `})
      .then(() => setRows(rows.filter(other => other !== rows[item])))
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleChange1 = item =>{
    setName(item)

  }
  const handleChange2 = item =>{
    setEmail(item)

  }
  const handleChange3 = item =>{
    setAge(item)

  }
  const handleChange4 = item =>{
    setAddress(item)

  }
  const handleChange5 = item =>{
    setId(item)

  }
  const handleSubmit1=(a) =>{
    console.log('linhlinhlinh')
    let b=[...rows];
     b.push(createData(name, email, age, address, id ))
    setRows(b);
    handleClose1();
    a.preventDefault();
  }

  
 
  // function handleChange(index){
  //   setDisplay (!display)
  //   //console.log(index) 
  //   setItem (
  //     index
  //   )
    //console.log(item)
  
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    handleClose()
    console.log(data.Name)
    let b=[...rows];
    b[item] = createData(data.Name, data.Email, data.Age, data.Address,data.Id )
    setRows(b);
    handleClose1()
  } ;
  // const onSubmit = data => {
  //   console.log(data.Name)
  //   let b=[...rows];
  //   b.push(createData(data.Name, data.Email, data.Age, data.Address,data.Id ))
  //   setRows(b)

  // } ;


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = (a) => {
    setOpen(true); setItem(a)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true)
  };

  const handleClose1 = () => {
    setOpen1(false);
  };


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input className="input" name="Name" placeholder="name customer"   ref={register} />
            <input className="input" name="Email" placeholder="email @" ref={register({ required: true })} />
            <input className="input" name="Age" placeholder="age"  ref={register} />
            <input className="input" name="Address" placeholder="address"  ref={register} />
            <input className="input" name="Id" placeholder="Id"  ref={register} />
            <input className="input" type="submit" />
        </form>
    </div>
  );
  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={handleSubmit1}>
                <label >
                  Name:
                  <input className="input"
                    type="text"
                    onChange={e => handleChange1(e.target.value)}
                  />
                </label>
                <label >
                  Email:
                  <input className="input"
                    type="email"
                    onChange={e => handleChange2(e.target.value)}
                  />
                </label>
                <label className="input1">
                  Age:
                  <input className="input"
                    type="number"
                    onChange={e => handleChange3(e.target.value)}
                  />
                </label>
                <label >
                  Address:
                  <input className="input"
                    type="text"
                    onChange={e => handleChange4(e.target.value)}
                  />
                </label>
                <label >
                  Id:
                  <input className="input"
                    type="number"
                    onChange={e => handleChange5(e.target.value)}
                  />
                </label >
                <input className="input" type="submit" value="Submit" />

          </form>
    </div>
  );
  return (
    <div className="App" >
    <div className="table">
      <h1 className="title">Customer List</h1>
      <div className="header">
      <IconButton onClick={() => handleOpen1()} >
          <AddIcon />
      </IconButton>
     <div className="search"> 
      
       <p>tìm kiếm</p>
       <IconButton onClick={() => handleOpen1()} >
          <SearchIcon />
      </IconButton>
     </div>
     
      </div>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key= {row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">
                {/* {!show1 && <button className="button" onClick={() => openModal1(rows.indexOf(row))}>Change</button> } */}

                {/* <IconButton onClick={() => openModal1(rows.indexOf(row))}>
                  
                </IconButton> */}
                  <IconButton onClick={() => handleOpen(rows.indexOf(row))} >
                  <EditIcon />
                  </IconButton>
               {/*  <button className="button" onClick={() => handleDelete(rows.indexOf(row))}>Delete</button>  */}
                <IconButton onClick={() => handleDelete(rows.indexOf(row))}>
                  <DeleteIcon />
                </IconButton>
                 
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>

    <Modal
      open={open1}
      onClose={handleClose1}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body1}
    </Modal>
    </div>
    </div>
    
  );

}