export default function invertCondition({ condition, message }) {
  return { condition: !condition, message };
}
