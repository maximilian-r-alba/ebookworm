Rails.application.routes.draw do
  resources :books, only: [:index, :show, :create]
  resources :messages, only: [:create , :update , :destroy]
  resources :chatrooms
  resources :users
  resources :subscriptions, only: [:create , :destroy]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
