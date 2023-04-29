Rails.application.routes.draw do
  
  mount ActionCable.server => '/cable'

  resources :books, only: [:index, :show, :create]
  resources :messages, only: [:create , :update , :destroy]
  resources :chatrooms
  resources :reviews
  resources :users, only: [:index, :create, :update, :destroy]
  resources :subscriptions, only: [:create , :destroy]

  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Defines the root path route ("/")
  # root "articles#index"
end
