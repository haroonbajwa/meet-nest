type AvatarFallbackProps = {
  name: string;
};

export function AvatarFallback({ name }: AvatarFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-zinc-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
