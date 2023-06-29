import {
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFuelService from '../../api/FuelService/FuelServiceHook';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function FuelTable(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { cardId, cardFuels } = props;
  const { deleteFuel } = useFuelService();

  const [fuels, setFuels] = useState(cardFuels);

  const [selected, setSelected] = useState(0);

  const handleClick = (event, name) => {
    setSelected((prevState) => (prevState === name ? -1 : name));
  };

  const isSelected = (fuelId) => selected === fuelId;

  const handleDeleteSelectedFuels = () => {
    deleteFuel(selected).then(() => {
      setFuels(fuels.filter((fuel) => fuel.id !== selected));
      // Clear the selected state to reflect the successful delete
      setSelected(-1);
    });
  };

  useEffect(() => {
    setSelected(-1);
  }, [cardId]);
  return (
    <div className="px-2 mt-10">
      <Divider>
        <h2
          className={`font-bold ${
            theme.palette.mode === 'dark' ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          Fuel
        </h2>
      </Divider>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  disabled={selected <= 0}
                  edge="start"
                  onClick={() => handleDeleteSelectedFuels()}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>{t('fuelTable.tableCellDate')}</TableCell>
              <TableCell>{t('fuelTable.tableCellLocation')}</TableCell>
              <TableCell>{t('fuelTable.tableCellCounter')}</TableCell>
              <TableCell>{t('fuelTable.tableCellAmount')}</TableCell>
              <TableCell>{t('fuelTable.tableCellPayment')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fuels.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.refuelingDate}</TableCell>
                  <TableCell>{row.refuelingLocation}</TableCell>
                  <TableCell>{row.vehicleCounter}</TableCell>
                  <TableCell>{row.refuelingAmount}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FuelTable;
