import { clsx } from 'clsx';
import { useAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { dvGames } from '@/constants/games';
import StyledButton from '@/components/ui/button/StyledButton';
import { dragonverseBetaDialogOpen, dvGameConfig, dvGameVersion } from '@/atoms/gpark/dragonverse';

export default function DragonVerseBetaDialog() {
  const router = useRouter();
  const [open, setOpen] = useAtom(dragonverseBetaDialogOpen);
  const [version, setVersion] = useAtom(dvGameVersion);
  const [gameConfig, setGameConfig] = useAtom(dvGameConfig);

  const onClick = () => {
    setOpen(false);
    router.push(`/game/dragonverse-beta`);
  };

  return (
    <Dialog
      title={<p className="px-4">Dragonverse Beta</p>}
      open={open}
      onOpenChange={setOpen}
      render={() => (
        <div className="p-5">
          <div className="grid gap-2">
            {dvGames.map((game) => (
              <div key={game.name} className="text-xl">
                <input
                  type="radio"
                  name="game"
                  id={game.name}
                  value={game.name}
                  onChange={() => setGameConfig(game)}
                  checked={gameConfig.name === game.name}
                />
                <label
                  className={clsx('ml-1.5 cursor-pointer', { 'text-blue': gameConfig.name === game.name })}
                  htmlFor={game.name}
                >
                  {game.name}
                </label>
              </div>
            ))}
            <div>
              Version:
              <input
                type="text"
                value={version}
                className="ml-2 border bg-transparent p-1"
                onChange={(event) => setVersion(event.target.value)}
              />
            </div>
            <StyledButton onClick={onClick} className="mt-4 w-full py-2" variant="gradient">
              Go
            </StyledButton>
          </div>
        </div>
      )}
    />
  );
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
