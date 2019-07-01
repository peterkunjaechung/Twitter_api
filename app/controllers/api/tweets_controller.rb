class Api::TweetsController < ApplicationController
  def search
    render json: TwitterClient.search(params[:term])
  end

  def tweet
    TwitterClient.tweet(params[:tweet])
    render json: tweet
  end
  
end
