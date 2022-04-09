import { TableCell, TableContainer, TableHead, Table, TableBody, Container, Paper, TableRow, Button, Stack, Typography, LinearProgress, Pagination } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';

const BasicTable = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const tableHeaders = ["Name", "Web Pages", "Alpha Two Code", "Country", "Domains", "State/Province"]

    const api = 'http://universities.hipolabs.com/search?country=Australia'
    const fetchData = async () => {
        setLoading(true)
        const res = await axios.get(api)
        setLoading(false)
        setData(res.data)
    }

    return (
        <Container>
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
                                <TableCell key={tableHeader}>
                                    {tableHeader}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice((page-1)*10, (page-1)*10+10).map((tableBody, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {tableBody.name}
                                </TableCell>
                                <TableCell>
                                    {tableBody.web_pages}
                                </TableCell>
                                <TableCell>
                                    {tableBody.alpha_two_code}
                                </TableCell>
                                <TableCell>
                                    {tableBody.country}
                                </TableCell>
                                <TableCell>
                                    {tableBody.domains}
                                </TableCell>
                                <TableCell>
                                    {!tableBody["state-province"] && "Null"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination 
                style={{
                    padding:20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"               
                }}
                // classes={{ul:classes.pagination}}
                count={(data?.length/10).toFixed(0)}
                onChange={(e,value)=>{setPage(value)}}
            /> 

            <Stack spacing={3} direction="row">
                <Button variant="contained" color='info' size='medium' onClick={() => fetchData()}>Load</Button>
                <Button variant="outlined" color='success' size='medium'>Add</Button>
                <Button variant="outlined" color='error' size='medium'>Delete</Button>
            </Stack>

        </Container>

    )
}

export default BasicTable