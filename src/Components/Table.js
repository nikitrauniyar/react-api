import { TableCell, TableContainer, TableHead, Table, TableBody, Container, Paper, TableRow, Button, Stack, Typography, LinearProgress } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';

const BasicTable = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

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
                        {data.map((tableBody, index) => (
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

            <Stack spacing={3} direction="row">
                <Button variant="contained" color='info' size='medium' onClick={() => fetchData()}>Load</Button>
                <Button variant="outlined" color='success' size='medium'>Add</Button>
                <Button variant="outlined" color='error' size='medium'>Delete</Button>
            </Stack>

        </Container>

    )
}

export default BasicTable