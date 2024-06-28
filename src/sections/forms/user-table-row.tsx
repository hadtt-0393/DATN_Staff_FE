import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Label from '../../components/label';
import DetailForm from './detail-form';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    form
}: any) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow hover tabIndex={-1} >
                {/* <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell> */}

                <TableCell align="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ marginLeft: "16px" }}>
                        <Avatar alt={name} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="center">{phone}</TableCell>

                <TableCell align="center">{checkin}</TableCell>

                <TableCell align="center">{checkout}</TableCell>

                <TableCell>
                    {room}
                </TableCell>

                <TableCell>
                    {people}
                </TableCell>

                <TableCell align="center">
                    {price}
                </TableCell>

                <TableCell align="center" >
                    <VisibilityIcon color='success' onClick={() => setOpen(true)} />
                </TableCell>
            </TableRow>
            <DetailForm isOpen={open} onClose={() => setOpen(false)} form={form}/>
        </>
    );
}
