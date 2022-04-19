import { TableCell, TableContainer, TableHead, Table, TableBody, Container, Paper, TableRow, Button, Stack, Typography, LinearProgress, Pagination } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { api } from '../Config/API';

const BasicTable = () => {

    // State Configurations
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const tableHeaders = ["Name", "Web Pages", "Alpha Two Code", "Country", "Domains", "State/Province"]

    // Fetch Data Function
    const fetchData = async () => {
        setLoading(true)
        const res = await axios.get(api())
        setLoading(false)
        setData(res.data)
    }

    // Add Button functionality
    const onAdd=()=>{
        const firstItem=data[0]
        setData([...data, firstItem]); //Please check last page to verify this function
    }

    // Delete Button Functionality
    const onDelete=()=>{

        const lastItemIndex = data.length - 1

        const newData=(data)=>{
            const temp = [...data];
            temp.splice(lastItemIndex, 1);
            return temp;
        }

        setData(newData);
        
  

    }

    // Different components of Material UI packages are used to beautify the UI
    return (
        <Container style={{marginTop:"30px"}}>
            {
                loading && (
                    <>
                        <Typography style={{ textAlign: "center" }}>Loading...</Typography>
                        <LinearProgress style={{ backgroundColor: 'lightgreen' }} />
                    </>
                )
            }
            <TableContainer component={Paper} mt="10px">
                <Table>
                    <TableHead color='primary'>
                        <TableRow>
                            {tableHeaders.map((tableHeader) => (
                                <TableCell key={tableHeader} style={{fontWeight:"bold"}}>
                                    {tableHeader}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data.slice((page-1)*10, (page-1)*10+10).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>
                                    {row.web_pages.join(", ")}
                                </TableCell>
                                <TableCell>
                                    {row.alpha_two_code}
                                </TableCell>
                                <TableCell>
                                    {row.country}
                                </TableCell>
                                <TableCell>
                                    {row.domains.join(", ")}
                                </TableCell>
                                <TableCell>
                                    {!row["state-province"] && "Null"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            <Pagination 
                style={{
                    padding:30,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"               
                }}
                // classes={{ul:classes.pagination}}
                count={parseInt((data?.length/10).toFixed(0))+1}
                onChange={(e,value)=>{setPage(value)}}
            /> 
            
            {/* Button Stack */}
            <Stack spacing={3} direction="row" style={{margin:"10", display:"flex", justifyContent:"center"}}>
                <Button variant="contained" color='info' size='medium' onClick={fetchData}>Load</Button>
                <Button variant="outlined" color='success' size='medium' onClick={onAdd}>Add</Button>
                <Button variant="outlined" color='error' size='medium' onClick={onDelete}>Delete</Button>
            </Stack>

        </Container>

    )
}

export default BasicTable