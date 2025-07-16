import React from "react";
import {
    TextField,
    Button,
    IconButton,
    Box,
    Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    useForm,
    useFieldArray,
    Controller
} from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
    Category: yup.array().of(
        yup.object().shape({
            value: yup
                .string()
                .required("This field is required")
        })
    ),
    name: yup.string().required("Name is required")
});


export default function MuiDynamicForm() {

    const { control, handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Category: [{ value: "" }],
            name: ""
        },
        resolver: yupResolver(schema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "Category"
    });

    const onSubmit = (data) => {
        console.log("Submitted Data: ", data);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 25, pb: 5 }}>
            <Paper elevation={3} sx={{ width: "30vw", pb: 5, minHeight: "45vh" }}>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>

                    <h1 style={{ display: "flex", justifyContent: "center" }}>Dynamic Form</h1>
                    <hr />

                    <Stack spacing={2} >

                        <Box display="flex" alignItems="center" gap={2} sx={{ pt: 6 }}>
                            <Controller
                                name={`name`}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={`name`}
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors?.name}
                                        helperText={errors?.name?.message}

                                    />
                                )}
                            />
                        </Box>

                        {fields.map((field, index) => (
                            <Box key={field.id} display="flex" alignItems="center" gap={2} >
                                <Controller
                                    name={`Category.${index}.value`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={`Category ${index + 1}`}
                                            variant="outlined"
                                            sx={{ width: "85%" }}
                                            error={!!errors?.Category?.[index]?.value}
                                            helperText={errors?.Category?.[index]?.value?.message}
                                        />
                                    )}
                                />
                                <IconButton
                                    color="error"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}

                        <Box sx={{ justifyContent: "center", display: "flex", pb: 2, pt: 2 }}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                sx={{ width: "180px", }}
                                onClick={() => append({ value: "" })}
                            >
                                ADD Category <span style={{ marginLeft: "7px", marginTop: "5px" }}> <AddIcon /> </span>
                            </Button>
                        </Box>

                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </Stack>

                </Box>

            </Paper>
        </Box>
    );
}
