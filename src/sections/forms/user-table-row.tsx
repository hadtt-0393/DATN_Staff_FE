import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Label from '../../components/label';
import DetailForm from './detail-form';

// ----------------------------------------------------------------------

export default function UserTableRow({
    name,
    avatarUrl,
    phone,
    checkin,
    checkout,
    room,
    people,
    price,
}: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow hover tabIndex={-1} >
                {/* <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell> */}

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{marginLeft:"16px"}}>
                        <Avatar alt={name} src={avatarUrl}  />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{phone}</TableCell>

                <TableCell>{checkin}</TableCell>

                <TableCell>{checkout}</TableCell>

                <TableCell>
                    <Label>{room}</Label>
                </TableCell>

                <TableCell>
                    {people}
                </TableCell>

                <TableCell>
                    {price}
                </TableCell>

                <TableCell align="right">
                    <Button variant="contained" onClick={() => setOpen(true)}>View</Button>
                </TableCell>
            </TableRow>
            <DetailForm isOpen={open} onClose={() => setOpen(false)}/>
        </>
    );
}
