import { describe, it, expect, vi } from 'vitest';

describe('Theory JS / TS Verifications', () => {
  it('verifies equality comparisons as detailed in technical specification', () => {
    // '01' == 1 vs '01' === 1
    // @ts-expect-error testing loose equality per task spec
    expect('01' == 1).toBe(true);
    // @ts-expect-error testing strict equality per task spec
    expect('01' === 1).toBe(false);

    // null === undefined vs null == undefined
    // @ts-expect-error testing strict equality
    expect(null === undefined).toBe(false);
    // @ts-expect-error testing loose equality
    expect(null == undefined).toBe(true);

    // null relational comparisons
    // @ts-expect-error testing comparison
    expect(null > 0).toBe(false);
    // @ts-expect-error testing equality
    expect(null == 0).toBe(false);
    // @ts-expect-error testing comparison
    expect(null >= 0).toBe(true);

    // undefined relational comparisons
    // @ts-expect-error testing comparison
    expect(undefined > 0).toBe(false);
    // @ts-expect-error testing comparison
    expect(undefined < 0).toBe(false);
    // @ts-expect-error testing equality
    expect(undefined == 0).toBe(false);
  });

  it('implements confirmAction callback pattern using prompt correctly', () => {
    function confirmAction(
      question: string,
      onConfirm: (val: string) => void,
      onCancel: (val: string | null) => void,
      promptFn: (q: string) => string | null
    ) {
      const response = promptFn(question);
      if (response !== null && (response.trim().toLowerCase() === 'да' || response.trim().toLowerCase() === 'yes')) {
        onConfirm(response);
      } else {
        onCancel(response);
      }
    }

    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    // User confirms with 'да'
    confirmAction('Удалить элемент?', onConfirm, onCancel, () => 'да');
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).not.toHaveBeenCalled();

    // User cancels with 'нет'
    confirmAction('Удалить элемент?', onConfirm, onCancel, () => 'нет');
    expect(onCancel).toHaveBeenCalledTimes(1);

    // User clicks Cancel (returns null)
    confirmAction('Удалить элемент?', onConfirm, onCancel, () => null);
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});
