import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Car } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../API/carapi";

export default function AddCar() {
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);   // ['cars']키를 가진 쿼리를 무효화 시키는 것
    },
    onError: (err) => console.log(err),
  });

  const handleSave = () => {
    mutate(car);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    });
    handleClose();
  }


  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => 
  {
    setCar({...car, [event.target.name]: event.target.value})
  }
  
  return(
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange} /><br />
          <input placeholder="Model" name="model" value={car.model} onChange={handleChange} /><br />
          <input placeholder="Color" name="color" value={car.color} onChange={handleChange} /><br />
          <input placeholder="Reg.nr" name="registrationNumber" value={car.registrationNumber} onChange={handleChange} /><br />
          <input placeholder="Year" name="modelYear" value={car.modelYear} onChange={handleChange} /><br />
          <input placeholder="Price" name="price" value={car.price} onChange={handleChange} /><br />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel | 취소</button>
          <button onClick={handleSave}>Save | 저장</button>
        </DialogActions>
      </Dialog>
    </>
  );
}