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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add"
import { useConfirm } from "material-ui-confirm";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, email, age, address, id) {
  return { name,  email, age, address, id };
}

export default function SimpleTable() {


  const [show1, setShow1] = useState(false);
  const openModal1 = (a) => {setShow1(true); setItem(a)};
  const closeModal1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);
  const openModal2 = () => setShow2(true);;
  const closeModal2 = () => setShow2(false);

  const confirm = useConfirm();


  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const [item, setItem] = useState(0)
  //const [displayadd, setDisplayadd] = useState(false);
  const [rows,setRows] = useState([createData('Linh', 'khanhlinh.trinh070@gmail.com', 62, '24 Tạ Quang bửu', 827),
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
    console.log('linh');
    console.log(item);
    confirm({description: `Are you sure delete this item `})
      .then(() => setRows(rows.filter(other => other !== rows[item])))
      .catch(() => console.log("Deletion cancelled."));
      console.log(rows)
  };

  const handleSubmit1 = () => {
    console.log(name)
    let b=[...rows];
    b.push(createData(name, email, age, address,id ))
    setRows(b)
  }
  // function handleSubmit(index) {
  //   index.preventDefault();
  //     let a=[...rows]
  //     a.splice(index, 1)
  //     console.log(a)
  //     setRows(
  //       a
  //     )
  // }
 

  
 
  function handleChange(index){
    setDisplay (!display)
    //console.log(index) 
    setItem (
      index
    )
    //console.log(item)
  }
  // function handleAdd(){
  //   setDisplayadd(!displayadd)
  // }

  return (
    <div className="table">
      <h1 className="title">Customer List</h1>

      <IconButton onClick={openModal2}>
                  <AddIcon />
                </IconButton>

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

                <IconButton onClick={() => openModal1(rows.indexOf(row))}>
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
        
        <div className={show2 ? "modal" : "hide"}>
              <form onSubmit={handleSubmit1}>
                <label>
                  Name:
                  <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  Age:
                  <input
                    type="number"
                    onChange={e => setAge(e.target.value)}
                  />
                </label>
                <label>
                  Address:
                  <input
                    type="text"
                    onChange={e => setAddress(e.target.value)}
                  />
                </label>
                <label>
                  Id:
                  <input
                    type="number"
                    onChange={e => setId(e.target.value)}
                  />
                </label>
                <input type="submit" value="Submit" />
          </form>
        </div>
    </div>
    
  );

}