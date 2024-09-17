<?php

// use App\Http\Middleware\DolibarrAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        // var_dump($exceptions);exit;
        $exceptions->render(function (Throwable $exception, Request $request) {
            // var_dump($exception->getMessage());
            // exit;
            if ($request->is(['admin', 'admin/*'])) {
                if ($exception instanceof UnauthorizedHttpException) {
                    return Inertia::render('admin/errors/403', [
                        'message' => 'Vous n\'avez pas la permission d\'accéder à cette ressource.',
                    ])->toResponse($request)->setStatusCode(Response::HTTP_FORBIDDEN);
                }

                if ($exception instanceof AuthenticationException) {
                    return Inertia::render('admin/errors/401', [
                        'message' => 'Accès non autorisé.',
                    ])->toResponse($request)->setStatusCode(Response::HTTP_UNAUTHORIZED);
                }

                if ($exception instanceof AccessDeniedHttpException) {
                    return Inertia::render('admin/errors/403', [
                        'message' => 'Accès refusé.',
                    ])->toResponse($request)->setStatusCode(Response::HTTP_FORBIDDEN);
                }

                if ($exception instanceof NotFoundHttpException) {
                    if ($exception->getStatusCode() == 404) {
                        return Inertia::render('admin/errors/404', [
                            'message' => 'Page non trouvée.',
                        ])->toResponse($request)->setStatusCode(Response::HTTP_NOT_FOUND);
                    }

                    if ($exception->getStatusCode() == 500) {
                        return Inertia::render('admin/errors/500', [
                            'message' => 'Erreur interne du serveur.',
                        ])->toResponse($request)->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
                    }

                    if ($exception->getStatusCode() == 503) {
                        return Inertia::render('admin/errors/503', [
                            'message' => 'Service temporairement indisponible.',
                        ])->toResponse($request)->setStatusCode(Response::HTTP_SERVICE_UNAVAILABLE);
                    }
                }
            }

            if ($exception instanceof NotFoundHttpException && $exception->getStatusCode() == 404) {
                return Inertia::render('customer/errors/404', [
                    'message' => 'Page non trouvée.',
                ])->toResponse($request)->setStatusCode(Response::HTTP_NOT_FOUND);
            }

            // Handle default exception cases
            return Inertia::render('errors/general', [
                'message' => 'Une erreur est survenue. Veuillez réessayer.',
            ])->toResponse($request)->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    })->create();
