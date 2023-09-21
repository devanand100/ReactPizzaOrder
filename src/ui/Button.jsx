export default function Button({
  children,
  type = "primary",
  classes,
  ...props
}) {
  const base =
    "rounded-full uppercase font-bold text-sm focus:ring transition-all duration-200 ";

  let style = {
    light:
      " bg-stone-300 px-4 py-3 text-black bg-primary text-black hover:bg-stone-400 focus:ring-stone-400 ",
    primary:
      " bg-primary px-4 py-3 text-secondary hover:bg-red-500 focus:ring-red-500 ",
    roundedPrimary:
      " bg-primary p-2 text-secondary hover:bg-red-500 focus:ring-red-500  ",
    roundedLight:
      " bg-stone-300 p-2 text-black bg-primary text-secondary hover:bg-stone-400 focus:ring-stone-400 ",
  };

  return (
    <button className={`${base} ${style[type]} ${classes}`} {...props}>
      {children}
    </button>
  );
}
