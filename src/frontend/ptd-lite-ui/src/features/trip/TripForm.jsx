import { useFieldArray, useForm } from 'react-hook-form';
import '../../css/trip_form.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './yupSchema';
import inputs from './tripInputs';

const TripForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      inputs: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inputs',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleAddRow = () => {
    const lastIndex = fields.length - 1;
    const lastRowValues = getValues(`inputs[${lastIndex}]`);

    const newRow = {
      locationStart: lastRowValues.locationEnd || '',
      countryStart: lastRowValues.countryEnd || '',
      counterStart: lastRowValues.counterEnd || '',
      locationEnd: '',
      countryEnd: '',
      counterEnd: '',
    };

    append(newRow);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div>
            <h3>Start</h3>
            {inputs.slice(0, 5).map((input) => (
              <div key={input.name}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  {...register(`inputs.${index}.${input.name}`)}
                  defaultValue={field[input.name] || ''}
                />
                <p>{errors?.inputs?.[index]?.[input.name]?.message}</p>
              </div>
            ))}
          </div>

          <div>
            <h3>End</h3>
            {inputs.slice(5).map((input) => (
              <div key={input.name}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  {...register(`inputs.${index}.${input.name}`)}
                  defaultValue={field[input.name] || ''}
                />
                <p>{errors?.inputs?.[index]?.[input.name]?.message}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddRow}>
        Add Row
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};
export default TripForm;
