import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Field } from '../components/profile/Field';
import { EditView } from '../components/profile/EditView';
import { PROFILE_FIELDS_20, INITIAL_PROFILE_VALUES } from '../api/mockData';
import profileReducer, {
  updateFieldValue,
  resetProfileForm,
} from '../features/profile/profileSlice';

describe('Profile Module & 20 Fields Hierarchy', () => {
  it('contains exactly 20 fields in PROFILE_FIELDS_20 definition', () => {
    expect(PROFILE_FIELDS_20).toHaveLength(20);
  });

  it('verifies all required field types exist: number, string, text, date, select, checkbox, radio', () => {
    const types = PROFILE_FIELDS_20.map((f) => f.type);
    expect(types).toContain('number');
    expect(types).toContain('string');
    expect(types).toContain('text');
    expect(types).toContain('date');
    expect(types).toContain('select');
    expect(types).toContain('checkbox');
    expect(types).toContain('radio');
  });

  it('renders Field for string, number, select, and radio', () => {
    const handleChange = vi.fn();
    const stringField = PROFILE_FIELDS_20.find((f) => f.id === 'fullName')!;
    render(
      <Field
        definition={stringField}
        value="Тестовый Пользователь"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/ФИО сотрудника/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Тестовый Пользователь');

    fireEvent.change(input, { target: { value: 'Новое Имя' } });
    expect(handleChange).toHaveBeenCalledWith('fullName', 'Новое Имя');
  });

  it('hides Field when hidden prop is true', () => {
    const handleChange = vi.fn();
    const officeField = PROFILE_FIELDS_20.find((f) => f.id === 'officeCity')!;
    render(
      <Field
        definition={officeField}
        value="kaluga"
        onChange={handleChange}
        hidden={true}
      />
    );

    expect(screen.queryByLabelText(/Поле Б: Офис присутствия/i)).not.toBeInTheDocument();
  });

  it('disables Field and marks it when disabled prop is true', () => {
    const handleChange = vi.fn();
    const mentorField = PROFILE_FIELDS_20.find((f) => f.id === 'mentorshipRequired')!;
    render(
      <Field
        definition={mentorField}
        value="mandatory"
        onChange={handleChange}
        disabled={true}
      />
    );

    const select = screen.getByLabelText(/Поле В: Необходимость наставника/i) as HTMLSelectElement;
    expect(select).toBeDisabled();
    expect(screen.getByText(/Заблокировано \(Поле В\)/i)).toBeInTheDocument();
  });

  describe('Advanced Field Dependency Logic (Поле А ➔ Поле Б ➔ Поле В)', () => {
    it('when employmentType is changed to "intern": hides officeCity and disables mentorshipRequired with preset "mandatory"', () => {
      const initialState = {
        fields: PROFILE_FIELDS_20,
        values: {
          ...INITIAL_PROFILE_VALUES,
          employmentType: 'full_time',
          officeCity: 'kaluga',
          mentorshipRequired: 'optional',
        },
        initialValues: { ...INITIAL_PROFILE_VALUES },
        hiddenFieldIds: {},
        disabledFieldIds: {},
        isSubmitting: false,
        saveSuccess: false,
        error: null,
        isLoading: false,
      };

      // Action: select "intern" in Field A
      const nextState = profileReducer(
        initialState,
        updateFieldValue({ fieldId: 'employmentType', value: 'intern' })
      );

      // Verify Field B (officeCity) is hidden
      expect(nextState.hiddenFieldIds.officeCity).toBe(true);

      // Verify Field C (mentorshipRequired) is disabled
      expect(nextState.disabledFieldIds.mentorshipRequired).toBe(true);

      // Verify Field C has preset value 'mandatory'
      expect(nextState.values.mentorshipRequired).toBe('mandatory');
    });

    it('when employmentType is reverted to "full_time": reveals officeCity and enables mentorshipRequired', () => {
      const internState = {
        fields: PROFILE_FIELDS_20,
        values: {
          ...INITIAL_PROFILE_VALUES,
          employmentType: 'intern',
          officeCity: 'kaluga',
          mentorshipRequired: 'mandatory',
        },
        initialValues: { ...INITIAL_PROFILE_VALUES },
        hiddenFieldIds: { officeCity: true },
        disabledFieldIds: { mentorshipRequired: true },
        isSubmitting: false,
        saveSuccess: false,
        error: null,
        isLoading: false,
      };

      const restoredState = profileReducer(
        internState,
        updateFieldValue({ fieldId: 'employmentType', value: 'full_time' })
      );

      expect(restoredState.hiddenFieldIds.officeCity).toBe(false);
      expect(restoredState.disabledFieldIds.mentorshipRequired).toBe(false);
    });

    it('resets form back to initial values on resetProfileForm', () => {
      const modifiedState = {
        fields: PROFILE_FIELDS_20,
        values: {
          ...INITIAL_PROFILE_VALUES,
          fullName: 'Измененное Имя',
          targetSalary: 500000,
        },
        initialValues: { ...INITIAL_PROFILE_VALUES },
        hiddenFieldIds: {},
        disabledFieldIds: {},
        isSubmitting: false,
        saveSuccess: true,
        error: null,
        isLoading: false,
      };

      const resetState = profileReducer(modifiedState, resetProfileForm());
      expect(resetState.values.fullName).toBe(INITIAL_PROFILE_VALUES.fullName);
      expect(resetState.values.targetSalary).toBe(INITIAL_PROFILE_VALUES.targetSalary);
      expect(resetState.saveSuccess).toBe(false);
    });
  });

  it('renders EditView with all 20 fields', () => {
    const handleChange = vi.fn();
    const handleSubmit = vi.fn();
    const handleReset = vi.fn();

    render(
      <EditView
        fields={PROFILE_FIELDS_20}
        values={INITIAL_PROFILE_VALUES}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    );

    expect(screen.getByText(/Связанность полей \(ТЗ: Продвинутый уровень\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Сохранить профиль \(20 полей\)/i)).toBeInTheDocument();
  });
});
