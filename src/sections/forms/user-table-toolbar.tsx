import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filterName, onFilterName }: any) {
    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
            }}
        >
            <OutlinedInput
                value={filterName}
                onChange={onFilterName}
                placeholder="Tìm kiếm khách hàng..."
                startAdornment={
                    <InputAdornment position="start">
                        <SearchOutlinedIcon />
                    </InputAdornment>
                }
            />
        </Toolbar>
    );
}
