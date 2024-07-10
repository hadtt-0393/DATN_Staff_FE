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
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                mr: 1, width: "40px", height: "40px", fontSize: "16px"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }


    return (
        <>
            <TableRow hover tabIndex={-1} >
                {/* <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell> */}

                <TableCell align="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ marginLeft: "16px" }}>
                        
                            <Avatar  {...stringAvatar(name)} />
                        
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
            <DetailForm isOpen={open} onClose={() => setOpen(false)} form={form} />
        </>
    );
}
