import { Checkbox, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import useFuelService from '../../api/FuelService/FuelServiceHook';
import { useTranslation } from 'react-i18next';

function AdBlueTable(props) {
    const { t } = useTranslation();
    const theme = useTheme()
    const { cardId, cardAdBlue } = props;
    const { deleteAdBlue } = useFuelService();

    const [adBlue, setAdBlue] = useState(cardAdBlue);
    const [selected, setSelected] = useState(0);

    const handleClick = (event, name) => {
        setSelected(prevState => prevState === name ? -1 : name);
    };

    const isSelected = (fuelId) => selected === fuelId;

    const handleDeleteSelectedAdBlue = () => {
        console.log(selected)
        deleteAdBlue(selected, cardId)
            .then(() => {
                setAdBlue(adBlue.filter(blue => blue.id !== selected));
                // Clear the selected state to reflect the successful delete
                setSelected(-1);
            })
    }

    useEffect(() => {
        setSelected(-1);
    }, [])

    return (
        <div className='px-2 mt-10'>
            <Divider><h2 className={`font-bold ${theme.palette.mode === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>Ad Blue</h2></Divider>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    disabled={selected <= 0}
                                    edge="start"
                                    onClick={() => handleDeleteSelectedAdBlue()}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{t('fuelTable.tableCellDate')}</TableCell>
                            <TableCell>{t('fuelTable.tableCellLocation')}</TableCell>
                            <TableCell>{t('fuelTable.tableCellAmount')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(adBlue).map((row) => {
                            const isItemSelected = isSelected(row.id);
                            return (
                                <TableRow key={row.id} hover onClick={(event) => handleClick(event, row.id)} >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                        />
                                    </TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.localization}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdBlueTable;