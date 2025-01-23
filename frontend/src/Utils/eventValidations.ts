import * as Yup from 'yup';

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  location: Yup.string()
    .required('Location is required')
    .min(3, 'Location must be at least 3 characters'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),
  region: Yup.string()
    .required('Region is required')
    .min(3, 'Region must be at least 3 characters'),
  chapter: Yup.string()
    .required('Chapter is required')
    .min(3, 'Chapter must be at least 3 characters')
});

export default eventSchema;
