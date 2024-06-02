// third-party
import { merge } from 'lodash';

// project import
import Button from './Button';
import Checkbox from './Checkbox';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import Link from './Link';
import OutlinedInput from './OutlinedInput';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Button(theme),
    Checkbox(theme),
    IconButton(theme),
    InputLabel(theme),
    Link(),
    OutlinedInput(theme),
    Typography()
  );
}
